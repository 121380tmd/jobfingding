<route>
{
      "name": "社区信息",
      "meta": {
        "requiresAuth": true,
        "invisible": true,
        "icon": "home"
      }
}
</route>
    
<template>
  <div class="main" v-if="this.errCode == 401">
    <el-empty description="暂无权限"></el-empty>
  </div>
  <div class="main" v-else>
    <div class="header">
      <div class="box-1">
        <div class="input-box">
          <el-input placeholder="请输入社区名称" v-model="searchIpt" clearable>
          </el-input>
        </div>
        <el-button @click="search()">查询</el-button>
        <el-button style="
            background: rgb(22, 179, 163);
            color: white;
            border: 1px rgb(22, 179, 163) solid;
          " @click="add()">新增</el-button>
        <el-button style="
            background: rgb(251, 183, 183);
            color: white;
            border: 1px rgb(251, 183, 183) solid;
          " @click="delMany()" :disabled="showdata">批量删除

        </el-button>
      </div>
      <div class="box-2"></div>
    </div>
    <div class="table">
      <!-- tempTableData -->
      <el-table ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" stripe :border="true"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="ID" width="120">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="name" label="社区名称" width="200">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="admin_phone" label="管理员电话" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="admin_name" label="管理员名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="创建时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="操作" show-overflow-tooltip>
                </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[1, 5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotal">
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
      show: true
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
      // console.log(val)
    },
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      //   console.log(`每页 ${val} 条`);
      let form = {
        pageNum: this.currentPage, //第几页
        pageSize: val, //几条数据
      };
      api.getCLista(form).then((res) => {
        this.dataList = res.data.list;
      });
      // this.getgetDataList()
      // this.tableData = this.tempTableData
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      let form = {
        pageNum: val, //第几页
        pageSize: this.pageSize, //几条数据
      };
      api.getCLista(form).then((res) => {
        this.dataList = res.data.list;
      });
      // this.getgetDataList()
      // this.tableData = this.tempTableData
    },
    // getgetDataList() {
    //     const startIndex = this.currentPage * this.pageSize - this.pageSize
    //     const endIndex = startIndex + this.pageSize
    //     this.tempTableData = this.tableData.slice((startIndex < 0 ? 0 : startIndex), endIndex)
    //     console.log(startIndex, endIndex)
    //     console.log('原始', this.tableData)
    //     console.log('赛选', this.tempTableData)
    //     // this.tableData = this.tempTableData
    // },
    add() {
      // this.$router({
      //     name:'add'
      // })
      this.$router.push("./b-add");
      //   console.log("add");
    },
    handleEdit(index, row) {
      //   console.log(index, row);
      this.$router.push({
        path: "./updatyeCommubity",
        query: row,
      });
    },
    handleDelete(index, row) {
      let _self = this;
      let form = [row.id];
      Modal.confirm({
        title: "您确定要删除这条数据吗?",
        // icon: createVNode(ExclamationCircleOutlined),
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',

        onOk() {
          api.delArea(form).then((res) => {
            // console.log(res);
            if (res.code === 200) {
              message.success("删除成功");
              _self.getList();
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 12000);
              }).catch(() => console.log("Oops errors!"));
            }
          });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() { },
      });
      // console.log(index, row);
      // console.log('del');

      // delArea
    },
    getList() {
      let form = {
        pageNum: this.currentPage, //第一页
        pageSize: this.pageSize, //五条数据
      };
      api
        .getCLista(form)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
          this.dataTotal = parseInt(res.data.total);
          // console.log("total", this.dataTotal);
          this.dataList = res.data.list;
        })
        .catch((err) => {
          console.log(err);
          this.errCode = err.code;
          //   console.log(this.errCode)
        });
    },
    delMany() {
      //   console.log(this.multipleSelection);
      let form = [];
      this.multipleSelection.forEach((item, index) => {
        form.push(item.id);
      });
      //   console.log(form);
      let _self = this;

      Modal.confirm({
        title: "您确定要删除这些数据吗?",
        // icon: createVNode(ExclamationCircleOutlined),
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          api.delArea(form).then((res) => {
            // console.log(res);
            if (res.code === 200) {
              message.success("删除成功");
              _self.getList();
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 12000);
              }).catch(() => console.log("Oops errors!"));
            }
          });
        },

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() { },
      });
    },
    search() {
      //   console.log("search");
      let form = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.searchIpt.trim(),
      };
      api.searchByKey(form).then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.dataTotal = res.data.total;
        // console.log("total", this.dataTotal);
        this.dataList = res.data.list;
      });
    },
  },
  mounted() {
    this.getList();
    this.tempTableData = this.tableData;

    // this.getgetDataList()
  },
  computed: {
    showdata() {
      if (this.multipleSelection == "") {
        this.show = true
      } else {
        this.show = false
      }
      return this.show
    }

  }
};
</script>
  
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 1%;

  .header {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;

    .box-1 {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .input-box {
        width: 40%;
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: #000;
        // height: 30%;s
      }

      .el-button {
        width: 10%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .box-2 {
      width: 50%;
      height: 100%;
    }
  }

  .table {
    width: 100%;
    height: 90%;
    // background: pink;
  }
}

.el-pagination {
  display: flex;
  margin-top: 1rem;
  // align-items: flex-end;
  justify-content: center;
}

// .el-table{
// display: flex;
// justify-content: center;
// align-items: center;
// flex-wrap: wrap;
// }
:deep(th > .cell) {
  text-align: center;
}

:deep(td > .cell) {
  text-align: center;
}
</style>
  