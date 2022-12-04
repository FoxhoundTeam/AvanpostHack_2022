package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New()

	// app.Post("/api/sift/", siftAnalyze)
	app.Post("/api/tf/", tensorflowAnalyze)

	app.Listen(":8000")
}
