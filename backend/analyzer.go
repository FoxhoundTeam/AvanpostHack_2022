package main

import (
	"encoding/base64"
	"image"

	tf "github.com/galeone/tensorflow/tensorflow/go"
	tg "github.com/galeone/tfgo"
	cv "gocv.io/x/gocv"
)

func prepareImage(bs64Image string) ([][][][]float32, error) {
	imageBytes, err := base64.StdEncoding.DecodeString(bs64Image)
	if err != nil {
		return nil, err
	}
	cvImage, decodeError := cv.IMDecode(imageBytes, cv.IMReadColor)
	if decodeError != nil {
		return nil, decodeError
	}
	resizeImage := cv.NewMat()
	cv.Resize(cvImage, &resizeImage, image.Point{X: 160, Y: 160}, 0, 0, cv.InterpolationLinear)
	img := resizeImage.Clone()
	cv.CvtColor(resizeImage, &img, cv.ColorBGRToGray)
	result := make([][][][]float32, 1)
	result[0] = make([][][]float32, 160)
	for i := 0; i < 160; i++ {
		result[0][i] = make([][]float32, 160)
		for j := 0; j < 160; j++ {
			pixel := float32(img.GetUCharAt(i, j)) / 255
			result[0][i][j] = []float32{pixel}
		}
	}
	return result, nil
}

func AnalyzeWithTensorflow(firstBs64Image string, secondBs64Image string) (float32, error) {
	model := tg.LoadModel("model", []string{"serve"}, nil)
	firstInputImage, err := prepareImage(firstBs64Image)
	if err != nil {
		return 0, err
	}
	secondInputImage, err := prepareImage(secondBs64Image)
	if err != nil {
		return 0, err
	}
	firstInput, _ := tf.NewTensor(firstInputImage)
	secondInput, _ := tf.NewTensor(secondInputImage)
	results := model.Exec([]tf.Output{
		model.Op("StatefulPartitionedCall", 0),
	}, map[tf.Output]*tf.Tensor{
		model.Op("serving_default_input_1", 0): firstInput,
		model.Op("serving_default_input_2", 0): secondInput,
	})
	predictions := results[0]
	return predictions.Value().([][]float32)[0][0], nil
}
