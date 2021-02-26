FROM python:alpine

RUN mkdir /dl

RUN apk --update add bash npm nodejs ffmpeg gcc linux-headers musl-dev wget
WORKDIR /dl
COPY . .

WORKDIR /dl/webui
RUN npm install && npm run-script build 

WORKDIR /dl/src
RUN pip install -U pip && pip install -r requirements.txt

CMD ["python3","app.py"]