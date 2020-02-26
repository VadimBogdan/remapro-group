<template>
  <div ref="navContainer">
    <div class="infobar-container">
      <div ref="mobileMenu" :class="mobileMenuClass" class="mobile-menu" @click.prevent="mobileMenuHandler">
        <a @click.prevent></a>
      </div>
      <a class="remapro-logo">
        <Logo />
      </a>
      <nav ref="nav" class="navigation">
        <ul>
          <li>
            <nuxt-link :class="mainLink" to="/">
              Main
            </nuxt-link>
          </li>
          <li is="drop-down" :name="'Production'" :contents="['Pallets EPAL / UIC', 'Used Pallets']" />
          <li
            is="drop-down"
            :name="'Services'"
            :contents="['Pallet Sales and manufacture', 'Purchase and repair of pallets']"
          />
          <li>
            <nuxt-link :class="logisticLink" to="/logistic">
              Logistics
            </nuxt-link>
          </li>
          <li is="drop-down" :name="'About us'" :contents="['About Rema Pro', 'Careers']" />
          <li>
            <nuxt-link :class="contactsLink" to="/contacts">
              Contacts
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="contacts">
        <span>Acceptance of applications:</span>
        <div>
          <a href="tel:+380686757879">+(380) 68 675 78 79</a>
          <br />
          <a href="tel:+38000000000">+(380) 00 000 00 00</a>
          <br />
          <a href="tel:+38000000000">+(380) 00 000 00 00</a>
        </div>
      </div>
      <div class="choose-language">
        <ul>
          <li>
            <a href="">EN</a>
          </li>
          <li>
            <a href="">RU</a>
          </li>
          <li>
            <a href="">UA</a>
          </li>
          <li>
            <a href="">DE</a>
          </li>
          <li>
            <a href="">IT</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import DropDown from '@/components/small/navbarDropDown/MenuDropDown.vue'
export default {
  components: {
    Logo,
    DropDown
  },
  data() {
    return {
      logo: null,
      mobileMenuIndicator: false,
      hasScrollBar: false,

      mobileNavHeight: undefined,

      navBarLocationDeterminant: {
        y: 0,
        delta(scrollY) {
          scrollY < 0 ? (this.IsDescending = true) : (this.IsDescending = false)
        },
        IsDescending: false
      }
    }
  },
  computed: {
    mainLink() {
      return {
        'active-link': this.$route.name === 'index'
      }
    },
    logisticLink() {
      return {
        'active-link': this.$route.name === 'logistic'
      }
    },
    contactsLink() {
      return {
        'active-link': this.$route.name === 'contacts'
      }
    },
    mobileMenuClass() {
      return {
        'mobile-menu__active': this.mobileMenuIndicator
      }
    }
  },
  beforeMount() {
    window.addEventListener('load', this.handleBigScreen)
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('resize', this.handleResize)
    this.$nuxt.$on('routeChanged', this.mobileMenuHandler)

    this.logo = document.getElementsByClassName('company-logo')[0]

    if (window.scrollY) {
      this.handleScroll()
    }
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  updated() {
    this.logo = document.getElementsByClassName('company-logo')[0]
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    mobileMenuHandler() {
      if (window.matchMedia('(min-width: 1130px)').matches) {
        return
      }
      this.mobileMenuIndicator = !this.mobileMenuIndicator
      if (this.mobileMenuIndicator) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = ''
      }
    },
    handleResize() {
      if (window.innerWidth > document.documentElement.clientWidth) {
        this.hasScrollBar = true
      } else {
        this.hasScrollBar = false
      }

      if (window.matchMedia('(min-width: 1130px)').matches) {
        this.$refs.nav.style.display = 'block'
        document.documentElement.style.overflow = ''
        this.mobileMenuIndicator = false
      } else {
        this.$refs.nav.style.display = 'none'
      }
    },
    handleKeyDown() {
      const key = event.key
      if (key === 'Escape' && this.mobileMenuIndicator) {
        this.mobileMenuHandler()
      }
    },
    handleBigScreen() {
      if (window.innerWidth > document.documentElement.clientWidth) {
        this.hasScrollBar = true
      }
      this.$refs.navContainer.style.transform = 'translateX(-50%)'
    },
    handleScroll() {
      if (this.mobileMenuIndicator && !this.hasScrollBar) {
        return
      }
      if (this.$refs.navContainer) {
        this.navBarLocationDeterminant.delta(window.scrollY - this.navBarLocationDeterminant.y)
        this.navBarLocationDeterminant.y = window.scrollY

        if (window.scrollY > 150) {
          if (this.navBarLocationDeterminant.IsDescending) {
            // &&
            // document.getElementById('contact--container').getBoundingClientRect().y >= 0 // not show on contact us form
            this.$refs.navContainer.style.transform = 'translateY(0px) translateX(-50%)'
            this.$refs.mobileMenu.onclick = null
          } else {
            this.$refs.navContainer.style.transform = 'translateY(-75px) translateX(-50%)'
            this.$refs.mobileMenu.onclick = this.mobileMenuHandler
            setTimeout(() => {
              this.$refs.navContainer.style.transform = 'translateY(-76px) translateX(-50%)'
            })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  display: none;

  width: 40px;

  &__active {
    &::before,
    &::after,
    a {
      background-color: lighten(#343148, 10) !important;

      transform: scale(0);
    }
    &::before {
      transform: translateY(12px) rotate(135deg);
    }
    &::after {
      transform: translateY(-12px) rotate(-135deg);
    }

    ~ :not(.contacts) {
      display: block !important;
    }
  }

  // menu-button
  &::before,
  &::after,
  a {
    border-radius: 3px;
    content: '';
    display: block;

    height: 5px;
    margin: 7px 0;

    transition: all 0.2s ease-in-out;

    background-color: #343148;
  }

  cursor: pointer;

  position: absolute;

  right: 50px;
  top: 50%;
  transform: translateY(-50%);
}
.contacts {
  font-family: 'open sans';
  float: right;

  span {
    user-select: none;
  }

  div {
    vertical-align: middle;
    display: inline-block;
    margin: 5px;
    a {
      display: inline-block;
      font-weight: bold;
      color: #000;
      &:hover {
        color: orange;
      }
    }
  }
}
.choose-language {
  position: absolute;
  right: 25%;
  top: 0;
  ul > li {
    float: left;
    padding-right: 5px;
    a {
      &:hover {
        color: orange;
      }
    }
  }
}
.infobar {
  grid-area: nav;
  position: fixed;
  background-color: white;
  width: 100%;

  max-width: 1680px;
  left: 50%;
  transform: translateX(-50%);

  transition: transform 0.5s ease-in-out;

  z-index: 3000;

  .active-link {
    color: grey;
  }
}
.infobar-container {
  height: 75px;

  position: relative;

  margin: 0 255px;

  > *:not(.choose-language):not(.mobile-menu) {
    top: 50%;
    transform: translateY(-50%);
    position: relative;
  }

  .remapro-logo {
    float: left;
  }
  /deep/ ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  // clearfix
  /deep/ ul::after {
    content: '';
    display: block;
    clear: both;
  }
}
.navigation {
  margin-left: 40px;
  float: left;
  > ul {
    > li {
      float: left;
      ::v-deep > a {
        color: black;
      }
      > a:hover:not(.active-link) {
        transition: all 0.3s ease-in-out 0s;
        color: orange;
      }
    }
    /deep/ li {
      display: block;
      padding: 9px 20px 9px 10px;
      transition: all 150ms ease-in-out 0s;

      font-weight: 600;
      letter-spacing: 0.5px;
    }
  }
  /deep/ ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
@media screen and (max-width: 1130px) {
  .choose-language {
    display: none;

    left: 2px;
    top: 70px;
  }
  .infobar-container {
    > *:not(.choose-language):not(.mobile-menu):not(.remapro-logo) {
      top: 0;
      transform: none;
    }
  }
  .navigation {
    display: none;

    z-index: -1;

    // height: 0;

    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    width: 100%;
    clear: left;
    margin: 25px 0 0 0;
    > ul > li {
      width: 100%;
    }
  }

  .mobile-menu {
    display: block;
  }
  .contacts {
    display: none;
  }
}
@media screen and (max-width: 1630px) {
  .infobar-container {
    margin: 0 230px;
  }
}
@media screen and (max-width: 1580px) {
  .infobar-container {
    margin: 0 205px;
  }
}
@media screen and (max-width: 1530px) {
  .infobar-container {
    margin: 0 180px;
  }
}
@media screen and (max-width: 1480px) {
  .infobar-container {
    margin: 0 155px;
  }
}
@media screen and (max-width: 1430px) {
  .infobar-container {
    margin: 0 130px;
  }
}
@media screen and (max-width: 1380px) {
  .infobar-container {
    margin: 0 105px;
  }
}
@media screen and (max-width: 1330px) {
  .infobar-container {
    margin: 0 80px;
  }
}
@media screen and (max-width: 1280px) {
  .infobar-container {
    margin: 0 55px;
  }
}
@media screen and (max-width: 1230px) {
  .infobar-container {
    margin: 0 30px;
  }
}
@media screen and (max-width: 1180px) {
  .infobar-container {
    margin: 0 5px;
  }
}
</style>
