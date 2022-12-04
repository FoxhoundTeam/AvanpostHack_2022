FROM gocv/opencv:4.6.0

RUN apt update && apt install -y curl git

WORKDIR /app

RUN curl -L "https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-cpu-linux-x86_64-2.9.1.tar.gz" | tar -C /usr/local -xz
RUN ldconfig

ENV GOPATH /go

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -v -o /analyzer

CMD [ "/analyzer" ]
