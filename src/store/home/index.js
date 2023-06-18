import { reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"


export default {
       //state仓库存储数据地方
       state:{
        //state中数据默认初始值根据服务器返回对象来初始化
        categoryList:[],
        bannerList:[],
        floorList:[]
       },
       //mutations：修改state的唯一手段（操作数据）
       //(state,value)value为传递过来的数据
       mutations:{
        CATEGORYLIST(state,categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,bannerList) {
            state.bannerList = bannerList
        },
        GETFLOORLIST(stata,floorList) {
            stata.floorList = floorList
        }

       },
       //actions：书写业务逻辑
       actions:{
        //通过api，向服务器发请求，获取服务器数据
        async categoryList({commit}) {
            const result= await reqCategoryList()
            console.log(result);
            if(result.code ==200) {
                commit("CATEGORYLIST",result.data)
            }
        },
        //获取首页轮播图数据
        async getBannerList({commit }) {
           let result =await reqGetBannerList()
           if(result.code ==200) {
            commit('GETBANNERLIST',result.data)
           }
        },
        //获取floor数据
        async getFloorList({commit}) {
            let result = await reqFloorList()
            if(result.code == 200) {
                commit('GETFLOORLIST',result.data)
            }
        }
        
       },
       //getters：理解为计算属性
       getters: {}
}