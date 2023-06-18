//存放所有的函数js文件
import{v4 as uuidv4} from 'uuid'
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token) {
        //如果没有生成游客临时身份
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}

