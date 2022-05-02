<template>
  <div>
    <nut-cell
      :is-link="true"
      :show-icon="false"
    >
      <div slot="avatar">
        <nut-avatar
          size="large"
          bg-icon
          bg-image="http://img30.360buyimg.com/uba/jfs/t1/84318/29/2102/10483/5d0704c1Eb767fa74/fc456b03fdd6cbab.png"
        ></nut-avatar>
      </div>
      <span slot="title">名字</span>
      <span slot="desc">性别：女</span>
    </nut-cell>

    <nut-cell
      :is-link="true"
      :show-icon="true"
      @click.native="editPathShow = true"
    >
      <span slot="title">地址</span>
      <span slot="sub-title"></span>
      <span slot="desc">编辑地址信息</span>
    </nut-cell>


    <nut-cell
      :is-link="true"
      :show-icon="true"
      @click.native="editAgeShow = true"
    >
      <span slot="title">年龄</span>
      <span slot="sub-title"></span>
      <span slot="desc">编辑年龄</span>
    </nut-cell>

    <nut-cell :is-link="true" :show-icon="true" @click.native="editJobShow = true">
      <span slot="title">工作</span>
      <span slot="sub-title"></span>
      <span slot="desc">编辑工作</span>
    </nut-cell>

    <nut-cell :is-link="true" :show-icon="true" @click.native="editPhoneShow = true">
      <span slot="title">手机号码</span>
      <span slot="sub-title"></span>
      <span slot="desc">编辑手机号码</span>
    </nut-cell>


    <nut-dialog
      title="编辑地址"
      :visible="editPathShow"
      @ok-btn-click="editPathInfo"
      @cancel-btn-click="cancelEditPath"
      @close="cancelEditPath">
      <nut-textinput
        v-model="path"
        label="请输入新地址："
        placeholder="请输入新地址"
        :clearBtn="true"
        :disabled="false"
      />
    </nut-dialog>

    <nut-dialog
      title="编辑年龄"
      :visible="editAgeShow"
      @ok-btn-click="editAgeInfo"
      @cancel-btn-click="cancelEditAge"
      @close="cancelEditAge">
      <nut-textinput
        v-model="age"
        label="请输入年龄："
        placeholder="请输入年龄"
        :clearBtn="true"
        :disabled="false"
      />
    </nut-dialog>

    <nut-dialog
      title="编辑工作"
      :visible="editJobShow"
      @ok-btn-click="editJobInfo"
      @cancel-btn-click="cancelEditJob"
      @close="cancelEditJob">
      <nut-textinput
        v-model="job"
        label="请输入工作："
        placeholder="请输入工作"
        :clearBtn="true"
        :disabled="false"
      />
    </nut-dialog>

    <nut-dialog
      title="编辑电话号码"
      :visible="editPhoneShow"
      @ok-btn-click="editPhoneInfo"
      @cancel-btn-click="cancelEditPhone"
      @close="cancelEditPhone">
      <nut-textinput
        v-model="phone"
        label="请输入新电话号码："
        placeholder="请输入新电话号码"
        :clearBtn="true"
        :disabled="false"
      />
    </nut-dialog>
  </div>
</template>

<script>
import {editUserInfo} from "../../network/profile";
  export default {
    name: "Profile",
    data() {
      return {
        path: '',
        age: '',
        job: '',
        phone: '',
        editPathShow: false,
        editAgeShow: false,
        editJobShow: false,
        editPhoneShow: false,
        id: ''
      }
    },
    created() {
      this.id = sessionStorage.getItem('id') || 1;
    },
    methods: {
      popMassage(code) {
        if(code == '200') {
          this.$toast.success('操作成功！');
        } else {
          this.$toast.success('操作失败！');
        }
      },
      async editPathInfo() {
        let res = await editUserInfo({path: this.path, id: this.id});
        this.popMassage(res.code);
        this.path = '';
        this.editPathShow = false;
      },
      cancelEditPath() {
        this.path = '';
        this.editPathShow = false;
      },
      async editAgeInfo() {
        let res = await editUserInfo({age: this.age, id: this.id});
        this.popMassage(res.code);
        this.age = '';
        this.editAgeShow = false;
      },
      cancelEditAge() {
        this.age = '';
        this.editAgeShow = false;
      },
      async editJobInfo() {
        let res = await editUserInfo({job: this.job, id: this.id});
        this.popMassage(res.code);
        this.job = '';
        this.editJobShow = false;
      },
      cancelEditJob() {
        this.job = '';
        this.editJobShow = false;
      },
      async editPhoneInfo() {
        let res = await editUserInfo({phone: this.phone, id: this.id});
        this.popMassage(res.code);
        this.phone = '';
        this.editPhoneShow = false;
      },
      cancelEditPhone() {
        this.phone = '';
        this.editPhoneShow = false;
      },
    }
  }
</script>

<style scoped>
</style>
