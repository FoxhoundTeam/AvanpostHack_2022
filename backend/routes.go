package main

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

func siftAnalyze(c *fiber.Ctx) error {
	c.Accepts("application/json")
	request := new(AnalyzeRequest)
	if err := c.BodyParser(request); err != nil {
		return err
	}
	response := AnalyzeResponse{
		Similarity:    1.0,
		ExecutionTime: 10,
	}
	if request.Verbose {
		return c.JSON(
			AnalyzeVerboseResponse{
				AnalyzeResponse: response,
				Image:           "1234",
			},
		)
	}
	return c.JSON(response)
}

func tensorflowAnalyze(c *fiber.Ctx) error {
	start := time.Now()
	c.Accepts("application/json")
	request := new(AnalyzeRequest)
	if err := c.BodyParser(request); err != nil {
		return err
	}
	result, err := AnalyzeWithTensorflow(request.FirstImage, request.SecondImage)
	if err != nil {
		return err
	}
	response := AnalyzeResponse{
		Similarity:    result,
		ExecutionTime: time.Since(start).Seconds(),
	}
	return c.JSON(response)
}
