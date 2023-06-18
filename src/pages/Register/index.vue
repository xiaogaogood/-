<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />

      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>

      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
      
        <el-form-item  prop="pass" label-width="50px" class="el-form-item" style="text-align: center;">
          <span >密码:</span>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            style="width:270px;margin-right: 30px; "
          ></el-input>
        </el-form-item>
        <el-form-item  prop="checkPass" style="text-align: center;">
          <span >确认密码:</span>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            style="width:270px;margin-right: 130px; "
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center; margin-left: -100px;">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >完成注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- ------------------------------------------------------------ -->
    
     
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button>完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      phone: "",
      //验证码
      code: "",
      //密码
      //password: "",
      //确认密码
      password1: "",
      //是否同意
      agree: true,
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      try {
        const { phone } = this;
        phone && (await this.$store.dispatch("getCode", phone));
        //将组件的code属性值变为仓库中验证码 (验证码通过v-model自己填写)
        this.code = this.$store.state.user.code;
      } catch (error) {}
    },
    //用户注册
    // async userRegister() {
    // try {
    //   const { phone, code, password, password1 } = this;
    //   console.log(this);
    //   phone &&code &&password == password1 &&(await this.$store.dispatch("userRegister", {
    //       phone,
    //       code,
    //       password,
    //     }));
    //   this.$router.push("/login");
    // } catch (error) {
    //   alert(error.message);
    // }
    // },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const { phone, code } = this;
            let password = this.ruleForm.pass;
            await this.$store.dispatch("userRegister", {
              phone,
              code,
              password,
            });
            this.$router.push("/login");
          } catch (error) {
            alert(error.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    // div:nth-of-type(1) {
    //   margin-top: 40px;
    // }

  
    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>