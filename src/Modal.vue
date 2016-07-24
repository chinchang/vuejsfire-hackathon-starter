<template>
  <div class="underlay" v-if="isVisible" transition="modal" @click="onUnderlayClick">
    <div class="modal {{ modalClass }}">
      <a @click="isVisible = false" class="modal__close-btn">
        <svg viewBox="0 0 24 24">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
        </svg>
      </a>

      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isVisible: {
      required: true,
      twoWay: true
    },
    modalClass: {
      type: String,
      default: ''
    }
  },

  created () {
    // TODO: add event listener only when modal isopened
    window.addEventListener('keyup', this.onKeyUp);
  },

  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp);
  },

  methods: {
    close() {
      this.isVisible = false;
    },

    onKeyUp(e) {
      if (e.which === 27) {
        this.close();
      }
    },

    onUnderlayClick(e) {
      if (e.target.classList.contains('underlay')) {
        this.close();
      }
    }
  }
}
</script>


<style>
.underlay {
  position: fixed;
  left: -40vw;
  right: -40vw;
  top: -40vh;
  bottom: -40vh;
  z-index: 1;
  background: rgba(102, 51, 153, 0.8);
  display:flex;
  align-items: center;
  justify-content: center;
}
.modal {
  position: relative;
  padding: 2em;
  background: #fff;
  border-radius: 4px;
  max-width: 90vw;
  min-width: 50vw;
  border: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 10px 20px 0 rgba(0,0,0,0.15);
}
@media screen and (max-width: 700px) {
  .modal {
    width: 95vw;
  }
}
@media screen and (max-width: 400px) {
  .modal {
    width: 98vw;
    padding: 1em;
  }
}
.modal__close-btn {
  position: absolute;
  right: 10px;
  top: 10px;
}
.modal-transition {
  will-change: transform, opacity;
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;
}
.modal-enter, .modal-leave {
  transform: scale(0.7);
  opacity: 0;
}
</style>
