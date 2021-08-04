<template>
  <transition name="ec-slide-up">
    <div v-if="show" class="ec-cookie-pop-wrap">
      <slot
        name="default"
        :getCookieAccept="getCookieAccept"
        :acceptTracking="acceptTracking"
        :declineTracking="declineTracking"
      >
        <div class="container">
          <span v-html="bodyCopy" />
          <div class="ec-vertical-separator" />
          <div class="ec-button-container">
            <button @click="declineTracking" class="btn mr-sm-3 mr-md-0 mr-lg-3" :class="buttonClasses.deny">Deny</button>
            <button @click="acceptTracking" class="btn ml-sm-3 ml-md-0 ml-lg-3" :class="buttonClasses.accept">Accept</button>
          </div>
        </div>
      </slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ec-cookie-popup',

  props: {
    buttonClasses: {
      type: Object,
      default () {
        return {
          accept: '',
          deny: ''
        }
      }
    },
    bodyCopy: {
      type: String,
      default: `We use cookies to provide important site features, personalize ads/content, and analyze how our site is 
        used. By clicking "Accept", you agree to our use of cookies. For more information, please read our 
        <a href="/terms-and-conditions/">Terms, Conditions, and Privacy Policy</a>.`
    }
  },

  data () {
    return {
      show: false,
    }
  },

  computed: {
    getCookieAccept () {
      return this.$ecommerce.tracking.getCookieAccept()
    }
  },

  mounted () {
    if(this.getCookieAccept){
      if (this.getCookieAccept === 'accept') {
        this.optIn()
      } else {
        this.optOut()
      }
    } else {
      this.showModal()
    }
  },

  methods: {
    showModal () {
      setTimeout(() => {
        this.show = true
        if (localStorage) {
          localStorage.setItem('ec-cookie-seen', new Date())
        }
      }, 2000)
    },

    declineTracking(){
      this.closeModal()
      this.$ecommerce.tracking.setCookieAccept('decline')
      this.optOut()
    },

    acceptTracking(){
      this.closeModal()
      this.$ecommerce.tracking.setCookieAccept()
      this.optIn()
    },

    optIn () {
      this.$ecommerce.tracking.optIn()
    },

    optOut () {
      this.$ecommerce.tracking.optOut()
    },

    closeModal () {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ec-cookie-pop-wrap {
  background-color: #3C566F;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1001;
  transition: all .3s;
  padding: 3rem 0.3rem 2.5rem;

  @media screen and (min-width: $md) {
    padding: 2rem 3rem;
  }

  @media screen and (min-width: $lg) {
    padding: 2rem 3.8rem;
  }

  & .container, & .ec-button-container {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    align-items: center;

    & span {
      margin-bottom: 0;

      & /deep/ a {
        font-weight: 600;
        text-decoration: underline
      }
    }

    @media screen and (min-width: $md) {
      flex-direction: row;
      text-align: left;
    }
  }

  & .ec-button-container {
    flex-direction: column-reverse;

    @media screen and (min-width: 370px){
      flex-direction: row;
    }
    @media screen and (min-width: $md) {
      flex-direction: column-reverse;
    }
    @media screen and (min-width: $lg) {
      flex-direction: row;
    }
  }

  & button {
    margin-top: 2rem;
    white-space: nowrap;
    width: 150px;

    @media screen and (min-width: 370px) and (max-width: $sm - 1px) {
      &:first-of-type {
        margin-right: 2rem;
      }
    }
    @media screen and (min-width: $md) {
      &:last-of-type {
        margin-top: 0;
      }
    }
    @media screen and (min-width: $lg) {
      margin-top: 0;
      width: 170px;
    }
  }
}

.ec-vertical-separator {
  align-self: stretch;
  width: 1px;
  border-right: 1px solid #fff;
  margin: 0 2.7rem;
  display: none;

  @media screen and (min-width: $md) {
    display: block;
  }
}


.ec-slide-up-enter-active, .ec-slide-up-leave-active {
  transition: bottom .7s;
}
.ec-slide-up-enter, .ec-slide-up-leave-to{
  bottom: -50%;
}
</style>