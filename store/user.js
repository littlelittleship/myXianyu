export const state = () => ({
    userInfo: {
        token: "",
        user: {
            nickname: '滚出去同学',
        }
    }
})

export const mutations = {
    // 这个方法会通过插件自动将数据存储到本地
    setUserInfo(state,data) {
        state.userInfo = data;
    },

    clearUserInfo(state) {
        state.userInfo ={
            token: '',
            user: {}
        }
    }

};

export const actions = {};