const express = require('express')
const mechanics = require('./mechanicdata')
const app = express()
const cors = require('cors')
require('dotenv').config();


const repairRequests = []

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());


app.get('/api/health', (req, res) => {
    res.send("MotorMitra is alive")
})

app.get('/api/getmechanics', (req, res) => {

    res.send(mechanics);
})

app.post('/api/match-mechanic', (req, res) => {
    const { gpsLocation, aiResponse, motorType } = req.body

    const faultCategory = aiResponse ? aiResponse.faultCategory : ""

    const vehicleRequired = aiResponse ? aiResponse.vehicleRequired : false

    const available = mechanics.filter(m => m.availability === "Available")

    const vehicleFiltered = vehicleRequired ? available.filter(m => m.hasVehicle === true) : available

    const getFaultScore = (mechanic, faultCategory) => {
        const key = Object.keys(mechanic.faultHistory || {}).find(
            k => k.toLowerCase() === faultCategory.toLowerCase()
        )
        return key ? mechanic.faultHistory[key].successRate : 0
    }
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        //lat and lng distance calculation
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    }

    const scored = vehicleFiltered.map(mechanic => {
        let score = 0

        if (mechanic.skills.some(s =>
            s.toLowerCase().includes(motorType.toLowerCase()))) {
            score += 40
        }
        if (gpsLocation.lat && gpsLocation.lng && mechanic.lat && mechanic.lng) {

            const distance = getDistance(gpsLocation.lat, gpsLocation.lng, mechanic.lat, mechanic.lng)

            // Closer = more points. Max 30 points for nearest
            if (distance <= 5) score += 30
            else if (distance <= 10) score += 25
            else if (distance <= 20) score += 15
            else if (distance <= 30) score += 5
            else score += 0 // outside service radius


            score += getFaultScore(mechanic, faultCategory) * 0.3

            // Rating weight
            score += mechanic.rating * 10

            // Experience weight
            score += mechanic.experience * 2

            // Completed jobs confidence
            score += Math.min(mechanic.completedJobs / 10, 20)
            console.log("distance", distance, "score:", score)

            return { ...mechanic, matchScore: Math.round(score), distanceKm: Math.round(distance) }
        }
        else {
            return { ...mechanic, matchScore: Math.round(score), distanceKm: "N/A" }
        }
    })

    // Step 4 — sort by score
    const ranked = scored.sort((a, b) => b.matchScore - a.matchScore)

    // Step 5 — return top 3
    res.json(ranked.slice(0, 3))

})
app.post('/api/requests', (req, res) => {
    const request = {
        id: Date.now(),
        farmerName: req.body.farmerName,
        phoneNumber: req.body.phoneNumber, // store as phoneNumber so both sides match
        location: req.body.location,
        farmerLat: req.body.farmerLat,
        farmerLng: req.body.farmerLng,
        motorType: req.body.motorType,
        symptoms: req.body.symptoms,
        aiDiagnosis: req.body.aiDiagnosis,
        assignedMechanic: req.body.assignedMechanic,
        status: "Pending",
        createdAt: new Date()
    }
    repairRequests.push(request)
    res.json({ success: true, requestId: request.id })
})

app.get('/api/requests', (req, res) => {
    res.json(repairRequests)
})


app.patch('/api/requests/:id/accept', (req, res) => {
    const request = repairRequests.find(r => r.id === parseInt(req.params.id))
    if (request) {
        request.status = "Accepted"
        request.acceptedAt = new Date()
        res.json({ success: true })
    } else {
        res.status(404).json({ error: 'Request not found' })
    }
})

// Mechanic marks the job as complete after repair is done
app.patch('/api/requests/:id/complete', (req, res) => {
    const request = repairRequests.find(r => r.id === parseInt(req.params.id))
    if (request) {
        request.status = "Complete"
        request.completedAt = new Date()
        res.json({ success: true })
    } else {
        res.status(404).json({ error: 'Request not found' })
    }
})

app.listen(3000, () => {
    console.log('server started at http://localhost:3000')
})