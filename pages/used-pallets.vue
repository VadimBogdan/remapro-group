<template>
  <div>
    <main>
      <h1>Used Pallets</h1>
      <h2>Epal pallets</h2>
      <p>
        Severe competition in the modern business world, especially under pressure of increasing prices and limited
        budget, often forces all companies to look for the ways of reducing costs and logistics optimization.
        <img
          src="~/assets/pallets/pallets-1.png"
          alt="pallets EPAL EUR"
          width="300px"
          height="250px"
          style="float: right"
        />
      </p>
      <p>
        <strong>Most common solution is the choice in favor of the used wood pallets.</strong>
      </p>
      <p>
        Our used pallets are of the highest quality and still perform their functions as well as new ones.
      </p>

      <p>
        We actively buy used wooden pallets all over Ukraine, restore their operating condition and do everything
        possible so that other could reuse pallets easily. Used pallets for sale remains the most popular offer in our
        company because it constitutes a perfect price-quality ratio.
      </p>
      <h2>We offer the following types of used pallets:</h2>
      <ul>
        <li><strong>Euro Pallet A</strong></li>
        <li><strong>Euro Pallet B</strong></li>
      </ul>
      <p>
        <strong>Euro Pallet A</strong> is a pallet of a light color that has been used no more than two times. It is no
        different from the new pallet in its appearance. Used pallets are widely used in goods export all over the
        world.
      </p>
      <p>
        <strong>Euro pallet B</strong> is of a dark color. It is used for load storage and shipping. Some part of euro
        pallets B undergo repair that entails partial details replacement.
      </p>
      <p>
        We use only the best equipment, details and instruments to refurbish used wooden pallets. After repair, we
        thoroughly examine pallets to make sure that all our production meets the standards necessary for safe usage.
      </p>
      <div class="attachment">
        <div class="attachment__image-overlay" @click.self="overlay($event)">
          <span class="attachment__image-overlay__span"></span>
        </div>
        <img class="attachment__image" src="~/assets/pallets/used-pallets-1.jpg" alt="Example of used pallets" />
        <p>Warehouses of used pallets in Svaliava, WPES company</p>
      </div>
      <div class="attachment">
        <div class="attachment__image-overlay" @click.self="overlay($event)">
          <span class="attachment__image-overlay__span"></span>
        </div>
        <img class="attachment__image" src="~/assets/pallets/used-pallets-2.jpg" alt="Example of used pallets" />

        <p>Warehouses of used pallets</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlaySpan: null,
      confetties: [],
      hasScrollBar: false
    }
  },
  mounted() {
    if (window.innerWidth > document.documentElement.clientWidth) {
      this.hasScrollBar = true
    }
    addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      if (window.innerWidth > document.documentElement.clientWidth) {
        this.hasScrollBar = true
      } else {
        this.hasScrollBar = false
      }
    },
    confettiIsomorph(span, posW, posH, offsetDiff, offsetH) {
      const step = 3
      const colors = ['#A569BD', '#F4D03F', '#2ECC71']
      const count = Math.ceil(Math.abs(offsetDiff) / step)
      const sign = Math.sign(offsetDiff)
      let confElem = null
      for (let i = 0, dist = 0; i < count; i++, dist += step) {
        confElem = document.createElement('i')
        confElem.classList.toggle('confetti')

        confElem.style.left = `${posW}px`
        if (sign >= 0) {
          confElem.style.top = `${posH + dist}px`
        } else {
          confElem.style.top = `${offsetH + posH - dist}px`
        }

        confElem.style.backgroundColor = colors[Math.floor(Math.random() * 3)]
        this.confetties.push(confElem)
      }
      if (Math.abs(offsetDiff) >= 300) {
        const len = this.confetties.length
        for (let j = len - 80; j < len; j++) {
          this.confetties[j].style.visibility = 'hidden'
        }
      }
      this.confetties.forEach(e => {
        span.prepend(e)
      })

      requestAnimationFrame(() => {
        setTimeout(() => {
          this.confetties.forEach(elem => {
            elem.remove()
          })
          this.confetties = []
        }, 850)
      })

      requestAnimationFrame(() => {
        setTimeout(() => {
          this.confetties.forEach(elem => {
            elem.style.visibility = ''
          })
        }, 280)
      })

      requestAnimationFrame(() => {
        let x, y
        this.confetties.forEach(elem => {
          x = Math.floor(Math.random() * Math.sign(0.5 - Math.random()) * 30)
          y = Math.floor(Math.random() * Math.sign(0.5 - Math.random()) * 15)
          elem.style.transform = `translate(${x}px, ${y}px)`
          elem.style.opacity = '0'
        })
      })
    },
    overlay(event) {
      const elem = event.target
      if (this.overlaySpan) {
        this.overlaySpan.classList.toggle('attachment__image-overlay__span--active')
        this.overlaySpan.style.transform = ''
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.overlaySpan.children[0].remove()
            this.overlaySpan.style.top = ''

            this.overlaySpan = null

            if (this.hasScrollBar) {
              document.body.classList.remove('noscroll--y')
            }

            document.getElementsByClassName('infobar')[0].classList.toggle('noshow')
            elem.classList.toggle('attachment__image-overlay--active')
          }, 300)
        })

        return
      }
      this.overlaySpan = elem.children[0]
      const img = elem.parentElement.getElementsByTagName('img')[0]
      const offsetOne = img.getBoundingClientRect().y
      const offsetTwo = window.innerHeight / 2 - img.height / 2

      elem.classList.toggle('attachment__image-overlay--active')
      this.overlaySpan.classList.toggle('attachment__image-overlay__span--active')

      this.overlaySpan.append(img.cloneNode())

      this.overlaySpan.style.top = `${offsetOne}px`
      if (this.hasScrollBar) {
        document.body.classList.add('noscroll--y')
      }
      document.getElementsByClassName('infobar')[0].classList.toggle('noshow')

      this.overlaySpan.style.transform = `translateY(${offsetTwo - offsetOne}px)`
      this.confettiIsomorph(
        // parent element for confetti blocks
        elem,
        // left offset
        img.width / 2 + img.offsetLeft,
        // top offset
        offsetOne - 15,
        // difference between present and future states
        offsetTwo - offsetOne,
        // image height for backward confetti
        img.offsetHeight
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment {
  text-align: center;
  margin-bottom: 125px;
  &:hover::before {
    opacity: 0.35;
  }

  &::before {
    content: '';
    position: absolute;

    width: 1024px;
    height: 360px;
    opacity: 0;

    transition: opacity 200ms ease-in-out;

    background: radial-gradient(circle, rgba(240, 240, 255, 1) 0%, rgba(107, 106, 108, 1) 100%);
  }
  &__image {
    width: 1024px;
    height: 360px;
    transition: opacity 500ms cubic-bezier(0.53, 0.05, 0.72, 0.16);
    user-select: none;
    &-overlay {
      &__span {
        display: inline-block;
        position: relative;
        max-height: 360px;
        transition: transform 300ms cubic-bezier(0.53, 0.05, 0.72, 0.16);
        z-index: 10;

        &:after {
          content: '';
          transition: background-color 300ms cubic-bezier(0.53, 0.05, 0.72, 0.16);
          background-color: rgba(105, 102, 105, 0.7);

          position: absolute;
          display: block;
          width: 100%;
          top: 0;
          bottom: 0;
        }
        &--active {
          &:after {
            transition: background-color 500ms cubic-bezier(0.53, 0.05, 0.72, 0.16);

            background-color: rgba(105, 102, 105, 0);
          }
        }
      }

      &--active {
        height: 100% !important;
        width: 100% !important;
        position: fixed;

        overflow-y: scroll;
        transform: none;
        top: 0;
        left: 0;
        z-index: 100;
        &:hover {
          transition: none;
        }

        + img {
          opacity: 0;
        }

        background-color: rgba(105, 102, 105, 0.7);
      }
      height: 360px;
      width: 1024px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
}
@media screen and (max-width: 1024px) {
  .attachment {
    &::before,
    &__image,
    &__image-overlay {
      width: 850px;
      height: 330px;
    }
  }
}
@media screen and (max-width: 920px) {
  .attachment {
    &::before,
    &__image,
    &__image-overlay {
      width: 650px;
      height: 300px;
    }
  }
}
@media screen and (max-width: 680px) {
  .attachment {
    margin-bottom: 85px;
    &::before,
    &__image,
    &__image-overlay {
      width: 450px;
      height: 280px;
    }
  }
}
@media screen and (max-width: 480px) {
  .attachment {
    margin-bottom: 45px;
    &::before,
    &__image,
    &__image-overlay {
      width: 320px;
      height: 225px;
    }
  }
}
@media screen and (max-width: 340px) {
  .attachment {
    &::before,
    &__image,
    &__image-overlay {
      width: 220px;
      height: 200px;
    }
  }
}
@media screen and (max-width: 240px) {
  .attachment {
    &::before,
    &__image,
    &__image-overlay {
      width: 140px;
      height: 160px;
    }
  }
}

.container {
  display: grid;
  grid:
    'nav nav nav' 75px
    '. main .' auto
    / 1fr minmax(150px, 1170px) 1fr;

  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
main {
  grid-area: main;
  h1 {
    margin-bottom: 50px;
  }
}
p {
  color: #727272;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.2px;
  line-height: 25px;
  margin: 0 0 20px;
}
ul {
  li {
    color: #727272;
    padding: 6px 0;
  }
  margin: 0 0 20px;
  padding: 0 0px 0px 20px;
}
table {
  td {
    border: 1px solid #e8e7e7;
    padding: 5px 10px;
  }
  border: 1px solid #e9e9e9;
  background-color: #fcfcfc;
  border-spacing: 0;
  letter-spacing: 0.5px;
  margin: 0 0 20px;
  text-align: left;
  table-layout: fixed;
  width: 100%;
}
h3 {
  font-size: 27px;
  line-height: 35px;
}
h2 {
  font-size: 30px;
}
h2,
h3 {
  font-weight: 400;
}
</style>
