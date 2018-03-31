<script lang="ts">
import Vue, { VNode } from 'vue'
import * as pathToRegexp from 'path-to-regexp'

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
    title: String,
    logo: String,
    action: String,
    content: String,
    extraContent: String,
    breadcrumbList: Array,
    breadcrumbNameMap: Object
  },
  render(h: any): VNode {
    const { logo, title, action, content, extraContent } = this
    return h(
      'div',
      {
        class: 'page-header'
      },
      [
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
        )
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
  }

  .tabs {
    margin: 0 0 -17px -8px;

    /deep/ .ant-tabs-bar {
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
