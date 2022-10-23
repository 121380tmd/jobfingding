<route>
{
      "name": "用户信息",
      "meta": {
        "requiresAuth": true,
        "invisible": true,
        "icon": "home"
      }
}
</route>
   
<template>
  <div class="fill">
    <div class="header">
      <div class="box-1">
        <el-button type="primary" @click="add">添加</el-button>
        <el-button>批量标记</el-button>
      </div>
      <div class="box-2">
        <el-input placeholder="请输入内容" v-model="searchIpt" clearable>
        </el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <!-- <el-table-column label="ID" width="120">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column> -->
        <el-table-column prop="name" label="名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" label="职位"> </el-table-column>
        <el-table-column prop="phone" label="电话" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.phone || "无" }}</template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column prop="status" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 'OPEN' ? 'success' : 'danger'">{{
              scope.row.status == "OPEN" ? "正常" : "封禁中"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.status == 'OPEN' ? 'danger' : 'success'"
              plain
              @click="handleEdit(scope.$index, scope.row)"
              >{{ scope.row.status == "OPEN" ? "封禁" : "解禁" }}
            </el-button>
            <el-button
              size="mini"
              type="primary"
              plain
              @click="resetPassword(scope.$index, scope.row)"
              >重置密码
            </el-button>
          </template>
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
      <a-modal v-model:visible="visible" title="重置密码" @ok="handleOk" centered="true">
        <p>您确定要重置密码吗？</p>
        <p style="font-size: 0.4rem; color: red">密码为手机号后六位</p>
      </a-modal>
      <a-modal v-model:visible="visible2" @ok="handleOkTwo">
        <p>
          您确定要{{
            disableInf.status == "OPEN" ? "封禁" : "解禁"
          }}这个用户吗？
        </p>
      </a-modal>
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
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 5,
      searchIpt: "",
      tempTableData: [],
      dataTotal: 1,
      dataList: [],
      visible: false,
      userId: "",
      userId2: "",
      visible2: false,
      disableInf: "",
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
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      let form = {
        pageNum: this.currentPage, //第几页
        pageSize: val, //几条数据
      };
      api.getList(form).then((res) => {
        this.dataList = res.data.list;
      });
      // this.getgetDataList()
      // this.tableData = this.tempTableData
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      let form = {
        pageNum: val, //第几页
        pageSize: this.pageSize, //几条数据
      };
      api.getList(form).then((res) => {
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
      this.$router.push("./add");
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.userId2 = row.id;
      this.visible2 = true;
      this.disableInf = row;
      //   OpenCloseStatus;
      //   this.$router.push({
      //     path: "./modifyJob",
      //     query: row,
      //   });
    },
    resetPassword(index, row) {
      //   console.log(index, row);
      this.userId = row.id;
      this.visible = true;
    },
    handleOk(e) {
      //   console.log(e);
      // resetPassWord
      let from = [this.userId];
      api.resetPassWord(from).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          message.success("重置成功");
          this.getUserdata();
        }
      });
      //   console.log("删除");
      this.visible = false;
    },
    handleOkTwo() {
      let from = [this.userId2];
      api.OpenCloseStatus(from).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          message.success("重置成功");
          this.getUserdata();
        }
      });
      //   console.log("删除");
      this.visible2 = false;
    },
    getUserdata() {
      let form = {
        pageNum: this.currentPage, //第一页
        pageSize: this.pageSize, //五条数据
      };
      api.getList(form).then((res) => {
        // console.log(res);
        this.dataTotal = res.data.total;
        // console.log("total", this.dataTotal);
        this.dataList = res.data.list;
      });
    },
  },
  //   resetPassWord
  mounted() {
    this.tempTableData = this.tableData;
    this.getUserdata();
    // this.getgetDataList()
    // this.tableData = this.tempTableData

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
      


