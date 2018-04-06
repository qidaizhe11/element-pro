<script lang="ts">
import Vue, { VNode } from 'vue'
import { Breadcrumb, BreadcrumbItem, Tabs, TabPane } from 'element-ui'
import * as pathToRegexp from 'path-to-regexp'

import { urlToList } from '../utils/pathTools'

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tabs)
Vue.use(TabPane)

export function getBreadcrumb(breadcrumbNameMap: any, url: string) {
  let breadcrumb = breadcrumbNameMap[url]
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item]
      }
    })
  }
  return breadcrumb || {}
}

export default Vue.extend({
  props: {
    title: [String, Array],
    logo: [String, Array],
    action: [String, Array],
    content: [String, Array],
    extraContent: [String, Array],
    breadcrumbList: Array,
    breadcrumbNameMap: Object,
    breadcrumbSeparator: String,
    linkElement: {
      type: String,
      default: 'router-link'
    },
    tabList: Array,
    tabActiveKey: String
  },
  methods: {
    onChange(tab: any) {
      const key = tab.name
      this.$emit('tab-change', key)
    },
    renderItem(linkElement: string, href: string, title: string) {
      return this.$createElement(
        linkElement,
        {
          props: linkElement !== 'a' ? { to: href } : {},
          attrs: linkElement === 'a' ? { href: href } : {}
        },
        title
      )
    },
    conversionFromProps() {
      const { breadcrumbList, breadcrumbSeparator, linkElement } = this
      return this.$createElement(
        'el-breadcrumb',
        {
          class: 'breadcrumb',
          props: {
            separator: breadcrumbSeparator
          }
        },
        breadcrumbList.map(item => {
          return this.$createElement(
            'el-breadcrumb-item',
            {
              key: item.title
            },
            [
              item.href
                ? this.renderItem(linkElement, item.href, item.title)
                : item.title
            ]
          )
        })
      )
    },
    conversionFromLocation(routerPath: string, breadcrumbNameMap: any) {
      const { breadcrumbSeparator, linkElement } = this
      // Convert the url to an array
      const pathSnippets = urlToList(routerPath)
      // Loop data mosaic routing
      const extraBreadcrumbItems = pathSnippets.map((url, index) => {
        const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url)
        const isLinkable =
          index !== pathSnippets.length - 1 && currentBreadcrumb.component
        if (currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb) {
          return this.$createElement(
            'el-breadcrumb-item',
            {
              key: url
            },
            [
              this.renderItem(
                isLinkable ? linkElement : 'span',
                url,
                currentBreadcrumb.name
              )
            ]
          )
        }
        return this.$createElement()
      })
      // Add home breadcrumbs to your head
      extraBreadcrumbItems.unshift(
        this.$createElement(
          'el-breadcrumb-item',
          {
            key: 'home'
          },
          [this.renderItem(linkElement, '/', '首页')]
        )
      )
      return this.$createElement(
        'el-breadcrumb',
        {
          class: 'breadcrumb',
          props: {
            separator: breadcrumbSeparator
          }
        },
        extraBreadcrumbItems
      )
    },
    conversionBreadcrumbList() {
      const { breadcrumbList, breadcrumbSeparator, breadcrumbNameMap } = this
      const routerPath = this.$route.path
      if (breadcrumbList && breadcrumbList.length) {
        return this.conversionFromProps()
      }
      if (routerPath) {
        return this.conversionFromLocation(routerPath, breadcrumbNameMap)
      }
    },
    renderTabs() {
      const { tabList, tabActiveKey } = this
      return this.$createElement(
        'el-tabs',
        {
          class: 'tabs',
          props: {
            value: tabActiveKey
          },
          on: {
            'tab-click': this.onChange
          }
        },
        tabList.map(item => {
          return this.$createElement('el-tab-pane', {
            props: {
              label: item.tab,
              name: item.key
            }
          })
        })
      )
    }
  },
  render(h: any): VNode {
    const { logo, title, action, content, extraContent, tabList } = this
    return h(
      'div',
      {
        class: 'page-header'
      },
      [
        this.conversionBreadcrumbList(),
        h(
          'div',
          {
            class: 'detail'
          },
          [
            (logo || this.$slots.logo) &&
              h('div', { class: 'logo' }, logo || this.$slots.logo),
            h('div', { class: 'main' }, [
              h('div', { class: 'row' }, [
                (title || this.$slots.title) &&
                  h('h1', { class: 'title' }, title || this.$slots.title),
                (action || this.$slots.action) &&
                  h('div', { class: 'action' }, action || this.$slots.action)
              ]),
              h('div', { class: 'row' }, [
                (content || this.$slots.content) &&
                  h(
                    'div',
                    { class: 'content' },
                    content || this.$slots.content
                  ),
                (extraContent || this.$slots.extraContent) &&
                  h(
                    'div',
                    { class: 'extra-content' },
                    extraContent || this.$slots.extraContent
                  )
              ])
            ])
          ]
        ),
        tabList && tabList.length && this.renderTabs()
      ]
    )
  }
})
</script>

<style lang="scss">
@import '~theme/theme.scss';

.page-header {
  background: $component-background;
  padding: 16px 32px 0 32px;
  border-bottom: $border-width-base $border-style-base $border-color-split;

  .detail {
    display: flex;
  }

  .row {
    display: flex;
  }

  .breadcrumb {
    margin-bottom: 16px;
    /deep/ .el-breadcrumb {
      &__inner,
      &__inner a {
        font-weight: normal;
      }
    }
  }

  .tabs {
    margin: 0 0 -16px -8px;

    /deep/ .el-tabs__header {
      border-bottom: $border-width-base $border-style-base $border-color-split;
    }
  }

  .logo {
    flex: 0 1 auto;
    margin-right: 16px;
    padding-top: 1px;
    > img {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-base;
      display: block;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    color: $heading-color;
  }

  .action {
    margin-left: 56px;
    min-width: 266px;

    /deep/ {
      .ant-btn-group:not(:last-child),
      .ant-btn:not(:last-child) {
        margin-right: 8px;
      }

      .ant-btn-group > .ant-btn {
        margin-right: 0;
      }
    }
  }

  .title,
  .action,
  .content,
  .extra-content,
  .main {
    flex: auto;
  }

  .title,
  .action {
    margin-bottom: 16px;
  }

  .logo,
  .content,
  .extra-content {
    margin-bottom: 16px;
  }

  .action,
  .extra-content {
    text-align: right;
  }

  .extra-content {
    margin-left: 88px;
    min-width: 242px;
  }
}

@media screen and (max-width: $screen-xl) {
  .page-header {
    .extra-content {
      margin-left: 44px;
    }
  }
}

@media screen and (max-width: $screen-lg) {
  .page-header {
    .extra-content {
      margin-left: 20px;
    }
  }
}

@media screen and (max-width: $screen-md) {
  .page-header {
    .row {
      display: block;
    }

    .action,
    .extra-content {
      margin-left: 0;
      text-align: left;
    }
  }
}

@media screen and (max-width: $screen-sm) {
  .page-header {
    .detail {
      display: block;
    }
  }
}

@media screen and (max-width: $screen-xs) {
  .page-header {
    .action {
      /deep/ {
        .ant-btn-group,
        .ant-btn {
          display: block;
          margin-bottom: 8px;
        }
        .ant-btn-group > .ant-btn {
          display: inline-block;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
