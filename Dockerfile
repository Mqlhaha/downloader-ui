FROM python:alpine

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple  && \
mkdir /dl

RUN apk --update add bash npm nodejs ffmpeg gcc linux-headers musl-dev\ 
&& npm config set registry https://registry.npm.taobao.org
WORKDIR /dl
COPY . .

WORKDIR /dl/webui
RUN npm install && npm run-script build 

WORKDIR /dl/src
RUN pip install -U pip && pip install -r requirements.txt

CMD ["python3","app.py"]