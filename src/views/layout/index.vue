<template>
  <div>
      <a-layout id="components-layout-demo-top-side">
        <!-- 头部页 -->
        <a-layout-header class="header">
          <div class="logo" />
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="headerSelectMenu"
            :style="{ lineHeight: '64px' }"
            @click="changHeaderMenu"
          >
            <a-menu-item v-for="item in headerMenu" :key="item['id']">
              {{item.name}}
            </a-menu-item>
          </a-menu>
        </a-layout-header>
        <!-- 主体页 -->
        <a-layout-content style="padding: 0 50px">
          <!-- 面包屑 -->
          <!-- <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item>测试</a-breadcrumb-item>
            <a-breadcrumb-item>测试页</a-breadcrumb-item>
          </a-breadcrumb> -->
          <!-- 左边导航栏 -->
          <a-layout style="padding: 24px 0; background: #fff">
            <a-layout-sider width="200" style="background: #fff">
              <!-- :default-open-keys="leftOpenSelectMenu" -->
              <!-- :default-selected-keys="leftSelectMenu" -->
              <a-menu
                mode="inline"
                style="height: 100%"
                :default-open-keys="leftOpenSelectMenu" 
                :default-selected-keys="leftSelectMenu"
                @click="changLeftMenu"
              >
                <a-sub-menu v-for="leftItem in leftMenu" :key="leftItem['id']">
                  <span slot="title"><a-icon type="user" />{{leftItem['name']}}</span>
                  <a-menu-item v-for="leftCholdrenItem in leftItem['children']" :key="leftCholdrenItem['id']">
                    {{leftCholdrenItem['name']}}
                  </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </a-layout-sider>
            <!-- 页面内容显示 -->
            <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
              <!-- 页面标签 -->
              <a-tabs v-model="activeKey" type="editable-card" @edit="onEdit" :hideAdd="true" @change="changTab">
                <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
                  <!-- {{ pane.content }} -->
                  
                  <keep-alive>
                      <router-view></router-view>
                  </keep-alive> 

                </a-tab-pane>
              </a-tabs>
            </a-layout-content>
          </a-layout>
        </a-layout-content>
        <!-- 底部页 -->
        <a-layout-footer style="text-align: center">
          Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
      </a-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeKey: [],
      panes: [],

      headerSelectMenu: ['1'],
      headerMenu: [
        {
          name: '头部导航1',
          router: '',
          id: "1"
        },
        {
          name: '头部导航2',
          router: '',
          id: "2"
        }
      ],

      leftMenu: [],

      leftOpenSelectMenu: [],
      leftSelectMenu: [],
      

      leftMenuOne: [
        {
          name: '头部导航栏1',
          router: '',
          id: "1",
          children: [
            {
              name: '头部导航栏1-1',
              router: '/',
              id: "1-1"
            },
            {
              name: '头部导航栏1-2',
              router: '/test1',
              id: "1-2"
            }
          ]
        },
      ],
      leftMenuTwo: [
        {
          name: '头部导航栏2',
          router: '',
          id: "2",
          children: [
            {
              name: '头部导航栏2-1',
              router: '/test3',
              id: "2-1"
            },
            {
              name: '头部导航栏2-2',
              router: '/test4',
              id: "2-2"
            }
          ]
        },
        {
          name: '用户模块',
          router: '',
          id: "3",
          children: [
            {
              name: '用户列表',
              router: '/user',
              id: "3-1"
            }
          ]
        },
      ]
    }
  },
  mounted() {
    
  },
  created() {
    this.leftMenu = this.leftMenuOne
    this.leftSelectMenu = ['1-1']
    this.leftOpenSelectMenu = ['1']
    // { title: '头部导航栏1-2', content: 'Content of Tab 2', key: '1-2', closable: false }
    this.panes = [
      { title: '头部导航栏1-1', content: 'Content of Tab 1', key: '1-1', closable: false}
    ];
    this.activeKey = "1-1"
  },
  methods: {
    changTab(item) {

      // 头部导航栏1  点击 到头部导航栏2  tab标签有导航栏1的页面点击不过去
      
      this.leftSelectMenu = [item]

      console.log(item)
      let keyArr = item.split("-")

      console.log(keyArr)

      let keyFatherMenu = {}
      this.leftMenu.forEach((fatherMenuItem) => {
        if (fatherMenuItem['id'] == keyArr[0].toString()) {
          keyFatherMenu = fatherMenuItem
        }
      })
      console.log(keyFatherMenu)
      let addMenuObj = {}

      for(let j =1 ; j < keyArr.length; j ++) {
        let keyItem = keyArr[j]
        console.log(keyItem)
        if ('children' in keyFatherMenu) {
          keyFatherMenu['children'].forEach((childrenMenuItem) => {
            if (childrenMenuItem['id'] == keyArr[0] + '-' +keyItem) {
              addMenuObj = childrenMenuItem
              console.log(addMenuObj)
            }
          })
        }
      }

      this.$router.push({path:addMenuObj['router'], params:{}})
    },
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    },

    changLeftMenu(item) {
      // console.log(item)

      for(let i=0; i < this.panes.length; i ++) {
        let panesItem = this.panes[i]
        if(panesItem['key'] == item['key']) {
          this.activeKey = item['key']

          let keyArr = item['key'].split("-")
          let keyFatherMenu = {}
          this.leftMenu.forEach((fatherMenuItem) => {
            if (fatherMenuItem['id'] ==keyArr[0]) {
              keyFatherMenu = fatherMenuItem
            }
          })
          // console.log(keyFatherMenu)
          let addMenuObj = {}

          for(let j =1 ; j < keyArr.length; j ++) {
            let keyItem = keyArr[j]
            // console.log(keyItem)
            if ('children' in keyFatherMenu) {
              keyFatherMenu['children'].forEach((childrenMenuItem) => {
                if (childrenMenuItem['id'] == keyArr[0] + '-' +keyItem) {
                  addMenuObj = childrenMenuItem
                  // console.log(addMenuObj)
                }
              })
            }
          }

          this.$router.push({path:addMenuObj['router'], params:{}})
          break
        } else {
          if (i == this.panes.length - 1) {
            // console.log("最后一个元素")
            // console.log(this.leftMenu)

            let keyArr = item['key'].split("-")
            let keyFatherMenu = {}
            this.leftMenu.forEach((fatherMenuItem) => {
              if (fatherMenuItem['id'] ==keyArr[0]) {
                keyFatherMenu = fatherMenuItem
              }
            })
            // console.log(keyFatherMenu)
            let addMenuObj = {}

            for(let j =1 ; j < keyArr.length; j ++) {
              let keyItem = keyArr[j]
              // console.log(keyItem)
              if ('children' in keyFatherMenu) {
                keyFatherMenu['children'].forEach((childrenMenuItem) => {
                  if (childrenMenuItem['id'] == keyArr[0] + '-' +keyItem) {
                    addMenuObj = childrenMenuItem
                    // console.log(addMenuObj)
                  }
                })
              }
            }

            // 显示关闭图标
            this.panes.forEach((panesItemTwo) => {
              panesItemTwo['closable'] = true
            })

            // 进行添加
            let newAddObj = { title: addMenuObj['name'], content: 'Content of Tab' + item['key'], key: item['key'], closable: false }
            // console.log(newAddObj)
            this.panes.push(newAddObj)
            // 选中当前添加标签
            this.activeKey = item['key']
            this.$router.push({path:addMenuObj['router'], params:{}})
            break
          }
        }
      }
    },

    changHeaderMenu(item) {
      console.log(item['key'])
      if(item['key'] == '1') {
        this.leftMenu = this.leftMenuOne
        this.leftSelectMenu = ['1-1']
        this.leftOpenSelectMenu = [item['key']]
        this.activeKey = "1-1"
      } else if(item['key'] == '2') {
        this.leftMenu = this.leftMenuTwo
        this.leftSelectMenu = ['2-1']
        this.leftOpenSelectMenu = [item['key']]
        this.activeKey = "2-1"
      }
    }
  }
}
</script>

<style>

#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}

</style>
