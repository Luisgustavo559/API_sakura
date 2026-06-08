const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/gerarvoltas', async (req, res) => {

    const voltasPorCorredor = 5;

    db.query('SELECT id FROM corredores', (err, results) => {

        if (err) {
            return res.status(500).json({
                error: 'Erro ao buscar corredores'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Nenhum corredor encontrado'
            });
        }

        let totalInseridos = 0;

        results.forEach((corredores) => {

            for (let i = 1; i < voltasPorCorredor; i++) {

                const tempoAleatorio =
                    (Math.random() * (120 - 60) + 60).toFixed(2);

                db.query(
                    'INSERT INTO voltas (tempo, data, corredores_id) VALUES (?, NOW(), ?)',
                    [tempoAleatorio, corredores.id],
                    (err) => {

                        if (err) {
                            console.log(err);
                        } else {
                            totalInseridos++;
                        }

                    }
                );

            }

        });

        res.status(201).json({
            message: 'Voltas aleatorias criadas com sucesso',
            corredores: results.length,
            voltas_por_corredor: voltasPorCorredor,
            total_estimado: results.length * voltasPorCorredor,
        });

    });

});

module.exports = router;