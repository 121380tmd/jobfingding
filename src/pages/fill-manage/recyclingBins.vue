<route>
    {
          "name": "回收箱",
          "meta": {
            "requiresAuth": true,
            "invisible": true,
            "icon": "home"
          }
    }
    </route>
<template>
  <div class="fill" v-if="this.errCode == 401">
    <el-empty description="暂无权限"></el-empty>
  </div>
  <div class="fill" v-else>
    <div class="header">
      <div class="box-1">
        <el-button type="info" @click="recycleMany()">批量回收</el-button>
      </div>
      <div class="box-2">
        <el-input placeholder="请输入内容" v-model="searchIpt" clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search()"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="dataList"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column label="ID" width="120">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column> -->
        <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="80">
          <template slot-scope="scope">{{
            scope.row.sex == "MAN" ? "男" : "女"
          }}</template>
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="education" label="学历" width="100">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="area_info" label="社区" width="120">
        </el-table-column>
        <el-table-column prop="job_name" label="职业" width="100">
        </el-table-column>
        <el-table-column prop="id_card" label="身份证号" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
      
<script>
import api from "@/api";
import { throwStatement } from "@babel/types";
import { Modal, message } from "ant-design-vue";

export default {
  name: "UserManage2",
  // components: { GbDynamicTableForm },
  data() {
    return {
      tempTableData: [],
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      searchIpt: "",
      dataTotal: 0,
      dataList: [],
      errCode: "",
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      let form = {
        pageNum: this.currentPage, //第几页
        pageSize: val, //几条数据
      };
      api.getFormList(form).then((res) => {
        this.getrecall = res.data.list;
      });
      // this.tableData = this.tempTableData
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      let form = {
        pageNum: val, //第几页
        pageSize: this.pageSize, //几条数据
      };
      api.getFormList(form).then((res) => {
        this.getrecall = res.data.list;
      });
      // this.tableData = this.tempTableData
    },
    getList() {
      let form = {
        pageNum: this.currentPage, //第一页
        pageSize: this.pageSize, //五条数据
      };
      api
        .getrecall(form)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          this.dataTotal = parseInt(res.data.total);
          console.log("total", this.dataTotal);
          this.dataList = res.data.list;
        })
        .catch((err) => {
          this.errCode = err.code;
        });
    },
    add() {
      this.$router.push("./add");
    },
    search() {
      let form = {
        pageNum: this.currentPage, //第一页
        pageSize: this.pageSize, //五条数据
        search: this.searchIpt.trim(),
      };
      api.searchFillByKey(form).then((res) => {
        console.log(res);
        console.log(res.data);
        this.dataTotal = parseInt(res.data.total);
        console.log("total", this.dataTotal);
        this.dataList = res.data.list;
      });
      // searchFillByKey
    },
    recycleMany() {
      console.log("many回收");
      let _self = this;
      let form = [];
      this.multipleSelection.forEach((item, index) => {
        form.push(item.id);
      });
      Modal.confirm({
        title: "您确定要回收这些数据吗?",
        // icon: createVNode(ExclamationCircleOutlined),
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          api.recall(form).then((res) => {
            console.log(res);
            if (res.code === 200) {
              message.success("回收成功");
              _self.getList();
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 12000);
              }).catch(() => console.log("Oops errors!"));
            }
          });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "./updateFill",
        query: row,
      });
    },
  },
  mounted() {
    this.tempTableData = this.tableData;
    this.getList();
    // this.tableData = this.tempTableData

    // api.getFormList(form).then((res) => {
    //     console.log(res)

    // })
    // api.getCLista(form).then((res) => {
    //     console.log(res)

    // })
  },
};
</script>
      
<style lang="less" scoped>
.fill {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 1%;
}

.header {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-1 {
    width: 50%;
    height: 100%;
    // background: red;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .el-button {
      width: 12%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 1rem;
    }
  }

  .box-2 {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-input {
      width: 50%;
      height: 50%;
      margin-right: 3%;
    }

    .el-button {
      width: 10%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.table {
  width: 100%;
  height: 90%;
  // background: pink;
}

.el-pagination {
  display: flex;
  justify-content: center;
}

:deep(th > .cell) {
  text-align: center;
}

:deep(td > .cell) {
  text-align: center;
}
</style>