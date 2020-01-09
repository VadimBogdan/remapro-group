<template>
  <div id="contact--container" @click="removeFocus($event)">
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
      <div class="contact__inputs">
        <div class="contact__inputContainer">
          <label for="your-name">Your Name *</label>
          <input
            id="your-name"
            v-model="inputs[0].val"
            type="text"
            name="your-name"
            size="40"
            aria-required="true"
            aria-invalid="false"
            @focus="foc($event)"
            @blur="unfoc($event)"
          />
        </div>
        <div class="contact__inputContainer">
          <label for="your-email">Your Email *</label>
          <input
            id="your-email"
            v-model="inputs[1].val"
            type="email"
            name="your-email"
            size="40"
            aria-required="true"
            aria-invalid="false"
            @focus="foc($event)"
            @blur="unfoc($event)"
          />
        </div>
        <div class="contact__inputContainer">
          <label for="your-tel">Your phone number</label>
          <input
            id="your-tel"
            v-model="inputs[2].val"
            type="tel"
            name="your-tel"
            size="40"
            aria-required="true"
            aria-invalid="false"
            @focus="foc($event)"
            @blur="unfoc($event)"
          />
        </div>
      </div>
      <div class="contact__textareaAndButton">
        <label for="your-message">Message *</label>
        <textarea
          id="your-message"
          v-model="inputs[3].val"
          name="your-message"
          cols="40"
          rows="10"
          aria-required="true"
          aria-invalid="false"
          @focus="foc($event)"
          @blur="unfoc($event)"
        ></textarea>
        <button id="submit-button" type="submit" @mousedown.prevent="rippleEffect($event)">
          Send
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  //  @input="ev => (message.val = ev.target.value)"        :value=""
  data() {
    return {
      inputs: [
        { name: 'name', val: '', valid: false },
        { name: 'email', val: '', valid: false },
        { name: 'tel', val: '', valid: false },
        { name: 'message', val: '', valid: false }
      ],
      lastActive: null
    }
  },
  methods: {
    foc(ev) {
      this.lastActive = null
      ev.target.labels[0].classList.add('focused')
    },
    unfoc(ev) {
      for (const input of this.inputs) {
        if (input.val !== '' && input.name === ev.target.getAttribute('name').match(/-(\w+)/)[1]) {
          ev.target.labels[0].classList.add('good--label')
          ev.target.classList.add('good--input')
          ev.target.labels[0].classList.remove('bad--label')
          ev.target.classList.remove('bad--input')
          input.valid = true
        } else if (input.val === '' && input.name === ev.target.getAttribute('name').match(/-(\w+)/)[1]) {
          ev.target.labels[0].classList.add('bad--label')
          ev.target.classList.add('bad--input')
          ev.target.labels[0].classList.remove('good--label')
          ev.target.classList.remove('good--input')
          input.valid = false
        } else if (input.val === '' && input.name !== ev.target.getAttribute('name').match(/-(\w+)/)[1]) {
          const voidInput = document.getElementsByName('your-' + input.name)[0]
          voidInput.labels[0].classList.remove('good--label')
          voidInput.classList.remove('good--input')
          voidInput.labels[0].classList.remove('bad--label')
          voidInput.classList.remove('bad--input')
          input.valid = false
        }
      }
      ev.target.labels[0].classList.remove('focused')
    },
    removeFocus(ev) {
      const tagName = ev.target.tagName
      if (/input|textarea/i.test(tagName)) return
      if (this.lastActive) {
        this.inputs.forEach(input => {
          if (input.val === '') {
            const voidInput = document.getElementsByName('your-' + input.name)[0]
            voidInput.labels[0].classList.remove('good--label')
            voidInput.classList.remove('good--input')
            voidInput.labels[0].classList.remove('bad--label')
            voidInput.classList.remove('bad--input')
            input.valid = false
          }
        })
        this.lastActive.blur()
        this.lastActive = null
      } else {
        this.lastActive = document.getElementsByClassName('bad--input')[0]
      }
    },
    handleSubmit(ev) {
      this.inputs.forEach(input => {
        if (input.val !== '' && !input.valid) {
          const voidInput = document.getElementsByName('your-' + input.name)[0]
          voidInput.labels[0].classList.add('good--label')
          voidInput.classList.add('good--input')
          input.valid = true
        }
      })
      const check = this.inputs.some(input => {
        return !input.valid
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
        'your-name': this.inputs[0].val,
        'your-email': this.inputs[1].val,
        'your-tel': this.inputs[2].val,
        'your-message': this.inputs[3].val
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
      this.inputs.forEach(input => {
        input.val = ''
        const voidInput = document.getElementsByName('your-' + input.name)[0]
        voidInput.blur()

        voidInput.labels[0].classList.remove('good--label')
        voidInput.classList.remove('good--input')
        voidInput.labels[0].classList.remove('bad--label')
        voidInput.classList.remove('bad--input')
        input.valid = false
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
#contact--container {
  grid-area: form;
  position: relative;
}
h2 {
  margin: 70px 0 35px;
  font-size: 30px;
  font-weight: 400;
}
.contact {
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;

  flex-wrap: wrap;

  padding: 0 10%;

  font-size: 1rem;
  line-height: 1;

  &__inputContainer {
    margin-bottom: 25px;
  }

  label {
    position: absolute;
    pointer-events: none;

    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;

    transform-origin: bottom left;
    transform: translate(16px, 22px);

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

  // textarea placement
  position: absolute;
  bottom: 5px;
  right: 19%;

  user-select: none;
  // outline: none;
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
@media screen and (max-width: 1200px) {
  h2 {
    padding-left: 10px;
  }
}
@media screen and (max-width: 1150px) {
  #submit-button {
    right: 16%;
  }
  .contact {
    padding: 0 5%;
  }
}
@media screen and (max-width: 1075px) {
  #submit-button {
    right: 14%;
  }
  .contact {
    padding: 0 5%;
  }
}
@media screen and (max-width: 1015px) {
  #submit-button {
    right: 13%;
  }
  .contact {
    padding: 0 5%;
  }
}
@media screen and (max-width: 980px) {
  #submit-button {
    right: 10%;
  }
  .contact {
    padding: 0;
  }
}
@media screen and (max-width: 875px) {
  .contact {
    flex-direction: column;
    align-items: center;
  }
  #submit-button {
    right: 32%;
    bottom: -13px;
  }
}
@media screen and (max-width: 775px) {
  #submit-button {
    right: 29%;
  }
}
@media screen and (max-width: 650px) {
  #submit-button {
    right: 23%;
  }
}
@media screen and (max-width: 525px) {
  #submit-button {
    right: 17%;
  }
}
@media screen and (max-width: 420px) {
  #submit-button {
    right: 11%;
  }
}
@media screen and (max-width: 385px) {
  .contact {
    textarea,
    input {
      width: 290px;
      padding: 15px 14px;
    }
    label {
      transform: translate(16px, 19px);
    }
  }

  #submit-button {
    right: 16%;
  }
}

@media screen and (max-width: 325px) {
  .contact {
    textarea,
    input {
      width: 210px;
      padding: 13.5px 14px;
    }
    textarea {
      height: 180px;
    }
    label {
      transform: translate(16px, 17px);
    }
  }
  #submit-button {
    right: 75px;
  }
}
@media screen and (max-width: 260px) {
  .contact {
    textarea,
    input {
      width: 160px;
    }
  }
  #submit-button {
    padding: 4px 10px;
    right: 65px;
  }
}
</style>
