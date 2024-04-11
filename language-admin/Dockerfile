# 使用官方 Node.js 14 镜像作为基础镜像
FROM node:20.11.1

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/ && npm install

# 将项目文件拷贝到工作目录
COPY . .

# 构建生产环境的 React 应用
RUN npm run build

# 设置容器启动命令
CMD ["npm", "start"]

