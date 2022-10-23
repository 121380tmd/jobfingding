<route>
{
      "name": "分类管理",
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
        <el-button
          style="
            background: rgb(22, 179, 163);
            color: white;
            border: 1px rgb(22, 179, 163) solid;
          "
          @click="add()"
          >新增</el-button
        >
        <el-button type="danger" @click="delMany()">批量删除</el-button>
      </div>
      <div class="box-2">
        <el-input
          placeholder="根据姓名/电话/身份证号搜索"
          v-model="searchIpt"
          clearable
        >
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
        <!-- <el-table-column prop="classfy_name" label="所属分类">
        </el-table-column> -->
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <!-- <el-table-column prop="descript" label="职业描述">
          <template slot-scope="scope">{{
            scope.row.descript || "无"
          }}</template>
        </el-table-column> -->
        <el-table-column prop="create_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑
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
      api.getClassFyList(form).then((res) => {
        this.dataList = res.data.list;
      });
      // this.tableData = this.tempTableData
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      let form = {
        pageNum: val, //第几页
        pageSize: this.pageSize, //几条数据
      };
      api.getClassFyList(form).then((res) => {
        this.dataList = res.data.list;
      });
      // this.tableData = this.tempTableData
    },
    getList() {
      let form = {
        pageNum: this.currentPage, //第一页
        pageSize: this.pageSize, //五条数据
      };
      api.getClassFyList(form).then((res) => {
        // console.log(res);
        // console.log(res.data);
        this.dataTotal = parseInt(res.data.total);
        // console.log("total", this.dataTotal);
        this.dataList = res.data.list;
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
        // console.log(res);
        // console.log(res.data);
        this.dataTotal = parseInt(res.data.total);
        // console.log("total", this.dataTotal);
        this.dataList = res.data.list;
      });
      // searchFillByKey
    },
    delMany() {
      let _self = this;
      // console.log("many删除");
      let form = [];
      this.multipleSelection.forEach((item, index) => {
        form.push(item.id);
      });
      Modal.confirm({
        title: "您确定要删除这些数据吗?",
        // icon: createVNode(ExclamationCircleOutlined),
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          api.delForm(form).then((res) => {
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
        onCancel() {},
      });
      //   api.delForm(form).then((res) => {
      //     console.log(res);
      //   });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({
        path: "./modifyJob2",
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
      margin-right: 2rem;
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