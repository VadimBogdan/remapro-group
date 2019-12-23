/* eslint-disable */
export default {
  methods: {
    swipeEffects(distance) {
      if (!this.swipeIndicators) {
        this.swipeIndicators = [distance]
        this.isMouseMoveActive = true
      } else if (this.swipeIndicators.length === 1) {
        this.swipeIndicators.push(distance)
        // backward > 0
        if (this.swipeIndicators[0] - this.swipeIndicators[1] > 0) {
          // determination of dependent photo
          this.currentlyDependentBackPhotoPos = this.currentPhotoPos - 1 === -1 ? this.photosQuantity - 1 : this.currentPhotoPos - 1
          this.currentlyDependentFrontPhotoPos = this.currentPhotoPos + 1 === this.photosQuantity ? 0 : this.currentPhotoPos + 1
          this.currentlyIndependentPhotoPos = this.currentPhotoPos
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.isTouchingBackward = true
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.isTouchingForward = true
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingBackward = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isDependent = false
        } else {
          this.currentlyDependentBackPhotoPos = this.currentPhotoPos + 1 === this.photosQuantity ? 0 : this.currentPhotoPos + 1
          this.currentlyDependentFrontPhotoPos = this.currentPhotoPos - 1 === -1 ? this.photosQuantity - 1 : this.currentPhotoPos - 1
          this.currentlyIndependentPhotoPos = this.currentPhotoPos
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.isTouchingForward = true
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.isTouchingBackward = true
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.isDependent = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingForward = true
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.isDependent = false
        }
      } else if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingBackward) {
        // backward
        this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeRightValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeLeftValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue += this.swipeIndicators[1] - distance
        if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue >= this.imageMaxWidth) {
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeRightValue = this.imageMaxWidth
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeLeftValue = this.imageMaxWidth
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue = this.imageMaxWidth
        } else if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue <= -this.imageMaxWidth) {
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeRightValue = -this.imageMaxWidth
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeLeftValue = -this.imageMaxWidth
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue = -this.imageMaxWidth
        }
        this.swipeIndicators[1] = distance
      } else if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingForward) {
        // forward
        this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeLeftValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeRightValue += this.swipeIndicators[1] - distance
        this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue += this.swipeIndicators[1] - distance
        if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue <= -this.imageMaxWidth) {
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeLeftValue = -this.imageMaxWidth
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeRightValue = -this.imageMaxWidth
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue = -this.imageMaxWidth
        } else if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue >= this.imageMaxWidth) {
          this.images[this.currentlyDependentBackPhotoPos].touchedHelper.touchStylesChangeLeftValue = this.imageMaxWidth
          this.images[this.currentlyDependentFrontPhotoPos].touchedHelper.touchStylesChangeRightValue = this.imageMaxWidth
          this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue = this.imageMaxWidth
        }
        this.swipeIndicators[1] = distance
      }
    },
    swipeEffectsClear() {
      if (this.currentlyIndependentPhotoPos === undefined || this.currentlyDependentFrontPhotoPos === undefined || this.currentlyDependentBackPhotoPos === undefined) {
        return
      }

      // converting to percentages depending on imageMaxWidth
      if ((this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeRightValue * 100) / this.imageMaxWidth >= 20) {
        // backward
        this.twistCarousel('backward-swipe')
      } else if ((this.images[this.currentlyIndependentPhotoPos].touchedHelper.touchStylesChangeLeftValue * 100) / this.imageMaxWidth <= -20) {
        // forward
        this.twistCarousel('forward')
      } else {
        // if image didn't change
        if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingBackward) {
          this.images[this.currentlyDependentBackPhotoPos].untouchedHelper.isRecentlyUntouched = true
          setTimeout(() => {
            this.images[this.currentlyDependentBackPhotoPos].untouchedHelper.isRecentlyUntouched = false
            this.images[this.currentlyDependentBackPhotoPos].untouchedHelper.isUntouched = true
          }, 650)
          setTimeout(() => {
            this.images[this.currentlyDependentBackPhotoPos].untouchedHelper.isUntouched = false
            this.currentlyDependentBackPhotoPos = undefined
            this.currentlyDependentFrontPhotoPos = undefined
          }, 700)
        }
        if (this.images[this.currentlyIndependentPhotoPos].touchedHelper.isTouchingForward) {
          this.images[this.currentlyDependentFrontPhotoPos].untouchedHelper.isRecentlyUntouched = true
          setTimeout(() => {
            this.images[this.currentlyDependentFrontPhotoPos].untouchedHelper.isRecentlyUntouched = false
            this.images[this.currentlyDependentFrontPhotoPos].untouchedHelper.isUntouched = true
          }, 650)
          setTimeout(() => {
            this.images[this.currentlyDependentFrontPhotoPos].untouchedHelper.isUntouched = false
            this.currentlyDependentBackPhotoPos = undefined
            this.currentlyDependentFrontPhotoPos = undefined
          }, 700)
        }
      }

      Object.keys(this.images[this.currentlyIndependentPhotoPos].touchedHelper).forEach((key) => {
        this.images[this.currentlyIndependentPhotoPos].touchedHelper[key] = false
      })
      Object.keys(this.images[this.currentlyDependentFrontPhotoPos].touchedHelper).forEach((key) => {
        this.images[this.currentlyDependentFrontPhotoPos].touchedHelper[key] = false
      })
      Object.keys(this.images[this.currentlyDependentBackPhotoPos].touchedHelper).forEach((key) => {
        this.images[this.currentlyDependentBackPhotoPos].touchedHelper[key] = false
      })

      this.isSwipeReady = false
      setTimeout(() => {
        this.isSwipeReady = true
      }, 725)

      this.swipeIndicators = undefined
      this.currentlyIndependentPhotoPos = undefined
    },
    swipeCarouselPhoto(direction, id) {
      this.photoCarouselActionsDebounced(direction, id)
    },
    throttlingSimple(f, ms) {
      let isCooldown = false

      return function() {
        if (isCooldown) {
          return
        }

        f()

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    throttlingSpecial(obj, ms) {
      let isCooldown = false

      return function(key, ...optional) {
        if (isCooldown) {
          return
        }

        // added spread
        obj[key](...optional)

        isCooldown = true

        setTimeout(() => (isCooldown = false), ms)
      }
    },
    switchChangeImage(id) {
      if (id === this.currentPhotoPos) {
        return
      }
      const previousPhotoPos = this.currentPhotoPos
      this.currentPhotoPos = id
      this.images[previousPhotoPos].switchHelper.isHidingAnim = true
      setTimeout(() => {
        this.images[previousPhotoPos].isActive = false
        this.images[previousPhotoPos].switchHelper.isHiding = true
        this.images[previousPhotoPos].switchHelper.isHidingAnim = false
        this.images[id].switchHelper.isShowingAnim = true
        this.images[id].switchHelper.isShowing = true
      }, 321)
      setTimeout(() => {
        this.images[id].switchHelper.isShowing = false
        this.images[id].switchHelper.isShowingAnim = false
        this.images[previousPhotoPos].switchHelper.isHiding = false
        this.images[id].isActive = true
      }, 650)
    },
    twistCarousel(direction) {
      const previousPhotoPos = this.currentPhotoPos
      if (direction === 'forward') {
        this.currentPhotoPos++
        if (this.photosQuantity === this.currentPhotoPos) {
          this.currentPhotoPos = 0
        }
        this.images[previousPhotoPos].isActive = false
        this.images[previousPhotoPos].isForwarding = true
        this.images[this.currentPhotoPos].isActive = true
        setTimeout(() => {
          this.images[previousPhotoPos].switchHelper.isHiding = true
          this.images[previousPhotoPos].isForwarding = false
        }, 650)
        setTimeout(() => {
          this.images[previousPhotoPos].switchHelper.isHiding = false
        }, 665)
      } else if (direction === 'backward-swipe') {
        this.currentPhotoPos--
        if (this.currentPhotoPos === -1) {
          this.currentPhotoPos = this.photosQuantity - 1
        }
        this.images[previousPhotoPos].isActive = false
        this.images[this.currentPhotoPos].isActive = true
      } else {
        this.currentPhotoPos--
        if (this.currentPhotoPos === -1) {
          this.currentPhotoPos = this.photosQuantity - 1
        }
        this.images[previousPhotoPos].isActive = false
        this.images[this.currentPhotoPos].isMovingBackward = true
        this.images[this.currentPhotoPos].isActive = true

        setTimeout(() => {
          this.images[this.currentPhotoPos].isMovingBackward = false
        }, 650)
      }
    }
  }
}
