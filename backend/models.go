package main

type AnalyzeRequest struct {
	FirstImage  string `json:"firstImage" xml:"firstImage" form:"firstImage"`
	SecondImage string `json:"secondImage" xml:"secondImage" form:"secondImage"`
	Verbose     bool   `json:"verbose" xml:"verbose" form:"verbose"`
}

type AnalyzeResponse struct {
	Similarity    float32 `json:"similarity" xml:"similarity" form:"similarity"`
	ExecutionTime float64 `json:"executionTime" xml:"executionTime" form:"executionTime"`
}

type AnalyzeVerboseResponse struct {
	AnalyzeResponse
	Image string `json:"image" xml:"image" form:"image"`
}
