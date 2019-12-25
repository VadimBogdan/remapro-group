<template>
  <div class="contact--container">
    <h2>Contact us</h2>
    <form
      name="contact"
      method="POST"
      netlify
      netlify-honeypot="bot-field"
      class="contact"
      novalidate
      @submit.prevent="handleSubmit($event)"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <div class="contact__inputContainer">
        <label for="your-name">Your Name *</label>
        <input
          id="your-name"
          type="text"
          :value="name.val"
          name="your-name"
          size="40"
          aria-required="true"
          aria-invalid="false"
          @input="ev => (name.val = ev.target.value)"
          @focus="foc($event)"
          @blur="unfoc($event)"
        />
      </div>
      <div class="contact__inputContainer">
        <label for="your-email">Your Email *</label>
        <input
          id="your-email"
          type="email"
          name="your-email"
          size="40"
          :value="email.val"
          aria-required="true"
          aria-invalid="false"
          @input="ev => (email.val = ev.target.value)"
          @focus="foc($event)"
          @blur="unfoc($event)"
        />
      </div>
      <div class="contact__inputContainer">
        <label for="your-tel">Your phone number</label>
        <input
          id="your-tel"
          type="tel"
          name="your-tel"
          size="40"
          :value="tel.val"
          aria-required="true"
          aria-invalid="false"
          @input="ev => (tel.val = ev.target.value)"
          @focus="foc($event)"
          @blur="unfoc($event)"
        />
      </div>
      <div class="contact__additionalmsg">
        <label for="your-message">Message *</label>
        <textarea
          id="your-message"
          name="your-message"
          cols="40"
          rows="10"
          :value="message.val"
          aria-required="true"
          aria-invalid="false"
          @input="ev => (message.val = ev.target.value)"
          @focus="foc($event)"
          @blur="unfoc($event)"
        ></textarea>
      </div>
      <button id="submit-button" type="submit" @mousedown.prevent="rippleEffect($event)">
        Send
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: { val: '', valid: false },
      email: { val: '', valid: false },
      tel: { val: '', valid: false },
      message: { val: '', valid: false }
    }
  },
  methods: {
    foc(ev) {
      ev.target.labels[0].classList.add('focused')
    },
    unfoc(ev) {
      Object.keys(this.$data).forEach(name => {
        if (this.$data[name].val !== '' && name === ev.target.getAttribute('name').match(/(?<=-)\w+/)[0]) {
          ev.target.labels[0].classList.add('good--label')
          ev.target.classList.add('good--input')
          ev.target.labels[0].classList.remove('bad--label')
          ev.target.classList.remove('bad--input')
          this.$data[name].valid = true
        } else if (this.$data[name].val === '' && name === ev.target.getAttribute('name').match(/(?<=-)\w+/)[0]) {
          ev.target.labels[0].classList.add('bad--label')
          ev.target.classList.add('bad--input')
          ev.target.labels[0].classList.remove('good--label')
          ev.target.classList.remove('good--input')
          this.$data[name].valid = false
        } else if (this.$data[name].val === '' && name !== ev.target.getAttribute('name').match(/(?<=-)\w+/)[0]) {
          const voidInput = document.getElementsByName('your-' + name)[0]
          voidInput.labels[0].classList.remove('good--label')
          voidInput.classList.remove('good--input')
          voidInput.labels[0].classList.remove('bad--label')
          voidInput.classList.remove('bad--input')
          this.$data[name].valid = false
        }
      })
      ev.target.labels[0].classList.remove('focused')
    },
    handleSubmit(ev) {
      const check = Object.keys(this.$data).some(name => {
        return !this.$data[name].valid
      })
      if (check) {
        return false
      }
      this.xhr()
    },
    xhr() {
      const rq = new XMLHttpRequest()
      const url = document.getElementsByName('contact')[0].getAttribute('action')
      const encoded = this.encode({
        'form-name': 'contact',
        'your-name': this.name.val,
        'your-email': this.email.val,
        'your-tel': this.tel.val,
        'your-message': this.message.val
      })

      rq.onreadystatechange = function(vm) {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            alert('Thanks!')
            vm.clearInputs()
          } else if (this.status === 404) {
            alert('Something went wrong')
          }
        }
      }.bind(rq, this)

      rq.open('POST', url, true)
      rq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      rq.send(encoded)
    },
    encode(data) {
      return Object.keys(data)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&')
    },
    clearInputs() {
      Object.keys(this.$data).forEach(name => {
        this.$data[name].val = null
        const voidInput = document.getElementsByName('your-' + name)[0]
        voidInput.labels[0].classList.remove('good--label')
        voidInput.classList.remove('good--input')
        voidInput.labels[0].classList.remove('bad--label')
        voidInput.classList.remove('bad--input')
        this.$data[name].valid = false
      })
    },
    rippleEffect(ev) {
      const btn = ev.target
      const clRect = btn.getBoundingClientRect()
      const x = ev.pageX - clRect.x
      const y = ev.pageY - clRect.y - window.scrollY
      const duration = 500
      let animationFrame, animationStart

      const animationStep = function(timestamp) {
        if (!animationStart) {
          animationStart = timestamp
        }

        const frame = timestamp - animationStart
        if (frame < duration) {
          const easing = (frame / duration) * (2 - frame / duration)

          const circle = 'circle at ' + x + 'px ' + y + 'px'
          const color = 'rgba(255, 255, 255, ' + 0.4 * (1 - easing) + ')'
          const stop = 110 * easing + '%'

          btn.style.backgroundImage =
            'radial-gradient(' + circle + ', ' + color + ' ' + stop + ', transparent ' + stop + ')'

          animationFrame = window.requestAnimationFrame(animationStep)
        } else {
          btn.style.backgroundImage = ''
          window.cancelAnimationFrame(animationFrame)
        }
      }

      animationFrame = window.requestAnimationFrame(animationStep)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact--container {
  grid-area: form;
  // padding: 105px 20%;
  position: relative;
}
h2 {
  margin: 70px 0 35px;

  font-size: 30px;
  font-family: 'Open Sans';
  font-weight: 400;
  color: #242526;
}
.contact {
  // border-left: 230px solid transparent;
  // border-right: 230px solid transparent;
  // border-top: 50px solid transparent;
  // padding: 0 20%;
  // position: relative;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  font-size: 1rem;
  line-height: 1;

  &__additionalmsg {
    display: inline-block;
    position: relative;
    left: 270px;
  }
  &__inputContainer {
    clear: both;
    float: left;
    margin-bottom: 25px;

    position: relative;

    left: 250px;
  }

  label {
    position: absolute;
    pointer-events: none;

    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

    transform-origin: bottom left;
    transform: translate(14px, 20px);

    color: rgba(0, 0, 0, 0.54);
  }
  input,
  textarea {
    padding: 18.5px 14px;
    border-radius: 4px;

    margin: 1px 1px;

    -webkit-tap-highlight-color: transparent;
    outline: none;

    border: rgba(0, 0, 0, 0.23) solid 1px;
    color: rgba(0, 0, 0, 0.87);

    &:focus {
      border-width: 2px;
      border-color: #1976d2;
      margin: 0;
    }
    &:hover:not(:focus) {
      border-color: black;
    }
  }

  textarea {
    resize: none;
  }

  .focused {
    transform: translate(14px, -13px) scale(0.75) !important;
    box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 1);
    background-color: white;
  }
  .bad--label {
    transform: translate(14px, -13px) scale(0.75) !important;
    box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 1);
    background-color: white;
    color: red;
  }
  .bad--input {
    border-color: red !important;
  }
  .good--input {
    border-color: green !important;
  }
  .good--label {
    transform: translate(14px, -13px) scale(0.75) !important;
    box-shadow: 0px 0px 0px 5px rgba(255, 255, 255, 1);
    background-color: white;
    color: green;
  }
}

button[type='submit'] {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 600;
  line-height: 1.75;
  font-size: 0.875rem;
  border-radius: 4px;
  text-transform: uppercase;

  border: 0;

  position: relative;
  user-select: none;

  outline: none;
  left: 50px;
  &:hover {
    background-color: rgb(17, 82, 147);
  }

  > svg {
    display: inline-block;
    fill: #fff;
    margin-left: 8px;
    margin-right: -4px;
    pointer-events: none;
  }

  color: #fff;
  background-color: #1976d2;

  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
