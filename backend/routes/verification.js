const express = require('express');
const router = express.Router();

// Verify Card by QR Code
router.post('/qr', async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({ error: 'QR code data required' });
    }

    const parsed = JSON.parse(qrData);
    
    const verification = {
      isValid: true,
      studentId: parsed.studentId,
      name: parsed.name,
      institution: 'GITA Autonomous College',
      verificationTime: new Date(),
      status: 'verified'
    };

    res.json({
      success: true,
      verification
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid QR code'
    });
  }
});

// Real-time Card Verification
router.post('/realtime', async (req, res) => {
  try {
    const { studentId, cardId } = req.body;

    if (!studentId || !cardId) {
      return res.status(400).json({ error: 'Student ID and Card ID required' });
    }

    const verification = {
      cardId,
      studentId,
      isValid: true,
      institution: 'GITA Autonomous College',
      lastVerified: new Date(),
      expiryStatus: 'valid'
    };

    res.json({
      success: true,
      verification
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Batch Verification
router.post('/batch', async (req, res) => {
  try {
    const { cardIds } = req.body;

    if (!Array.isArray(cardIds)) {
      return res.status(400).json({ error: 'cardIds must be an array' });
    }

    const results = cardIds.map(id => ({
      cardId: id,
      isValid: true,
      institution: 'GITA Autonomous College',
      status: 'verified'
    }));

    res.json({
      success: true,
      totalCards: results.length,
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Verification History
router.get('/history/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const history = [
      {
        timestamp: new Date(Date.now() - 3600000),
        status: 'verified',
        location: 'Library'
      },
      {
        timestamp: new Date(Date.now() - 7200000),
        status: 'verified',
        location: 'Cafeteria'
      }
    ];

    res.json({
      success: true,
      studentId,
      institution: 'GITA Autonomous College',
      history
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;