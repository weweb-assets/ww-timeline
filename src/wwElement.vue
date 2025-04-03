<template>
  <div
    class="ww-timeline"
    :class="[
      `ww-timeline--${content.timelineLayout}`,
      `ww-timeline--align-${validAlignment}`,
    ]"
  >
    <div
      class="ww-timeline__container"
      :style="{
        '--connector-color': content.connectorColor,
        '--connector-width': content.connectorWidth,
        '--marker-size': content.markerSize,
        '--marker-icon-size': content.markerIconSize,
        '--marker-icon-color': content.markerIconColor,
        '--marker-background-color': content.markerBackgroundColor,
      }"
    >
      <div
        v-for="(item, index) in content.data"
        :key="index"
        class="ww-timeline__event"
        :class="{
          'ww-timeline__event--alternate':
            content.timelineLayout === 'vertical' &&
            validAlignment === 'alternate' &&
            index % 2 === 1,
        }"
      >
        <wwLayoutItemContext is-repeat :index="index" :data="item">
          <!-- Event marker -->
          <div
            class="ww-timeline__marker"
            :class="[`ww-timeline__marker--${content.markerShape}`]"
            @click="onMarkerClick(item)"
          >
            <template v-if="content.markerIconOnOff && content.markerIcon">
              <span v-html="iconHTML" class="ww-timeline__marker-icon" />
            </template>
          </div>

          <!-- Event content -->
          <div class="ww-timeline__content" @click="onClick(item)">
            <wwElement
              v-bind="content.timelineElement"
              class="ww-timeline__content-element"
            />
          </div>
        </wwLayoutItemContext>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ["trigger-event"],
  setup(props) {
    // Icon handling
    const icon = computed(() => props.content.markerIcon);
    const { getIcon } = wwLib.useIcons();
    const iconHTML = ref("");
    watch(
      icon,
      async () => {
        iconHTML.value = await getIcon(icon.value);
      },
      { immediate: true },
    );

    // Handle alignment based on layout
    const validAlignment = computed(() => {
      const layout = props.content.timelineLayout;
      const alignment = props.content.eventsAlignment;

      if (layout === "vertical") {
        // Check if the alignment is valid for vertical layout
        return ["left", "right", "alternate"].includes(alignment)
          ? alignment
          : "alternate"; // Default fallback for vertical
      } else {
        // Check if the alignment is valid for horizontal layout
        return ["top", "bottom"].includes(alignment) ? alignment : "top"; // Default fallback for horizontal
      }
    });

    return {
      iconHTML,
      validAlignment,
    };
  },
  methods: {
    onClick(item) {
      this.$emit("trigger-event", { name: "click", event: { value: item } });
    },
    onMarkerClick(item) {
      this.$emit("trigger-event", {
        name: "markerClick",
        event: { value: item },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ww-timeline {
  position: relative;
  width: 100%;

  &--vertical {
    .ww-timeline__container {
      padding: 20px 0;
    }

    .ww-timeline__event {
      position: relative;
      margin: 0;
      padding-bottom: 20px;
      min-height: 50px;
    }

    /* Left alignment (default) */
    &.ww-timeline--align-left {
      .ww-timeline__container {
        padding-left: 40px;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 8px; /* Position at 8px from the left edge */
          width: var(--connector-width);
          transform: translateX(
            calc(-1 * var(--connector-width) / 2)
          ); /* Center the connector regardless of width */
          background-color: var(--connector-color);
        }
      }

      .ww-timeline__marker {
        position: absolute;
        left: -32px; /* Position relative to connector */
        top: 15px;
        transform: translateX(-50%); /* Center the marker on the connector */
      }

      .ww-timeline__content {
        text-align: left;
      }
    }

    /* Right alignment */
    &.ww-timeline--align-right {
      .ww-timeline__container {
        padding-right: 40px;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 8px; /* Position at 8px from the right edge */
          width: var(--connector-width);
          transform: translateX(
            calc(var(--connector-width) / 2)
          ); /* Center the connector regardless of width */
          background-color: var(--connector-color);
        }
      }

      .ww-timeline__marker {
        position: absolute;
        right: -32px; /* Position relative to connector */
        top: 15px;
        transform: translateX(50%); /* Center the marker on the connector */
      }

      .ww-timeline__content {
        text-align: right;
        align-items: flex-end;
      }
    }

    /* Alternate alignment */
    &.ww-timeline--align-alternate {
      .ww-timeline__container {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%); /* Center properly */
          width: var(--connector-width);
          background-color: var(--connector-color);
          z-index: 1;
        }
      }

      .ww-timeline__event {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end;
        padding-right: 50%;
        padding-left: 0;

        .ww-timeline__marker {
          position: absolute;
          left: 50%;
          top: 15px;
          transform: translateX(-50%);
          z-index: 2;
        }

        .ww-timeline__content {
          width: calc(100% - 30px);
          margin-right: 30px;
          text-align: right;
          align-items: flex-end;
        }

        &--alternate {
          justify-content: flex-start;
          padding-left: 50%;
          padding-right: 0;

          .ww-timeline__content {
            margin-right: 0;
            margin-left: 30px;
            text-align: left;
            align-items: flex-start;
          }
        }
      }
    }
  }

  &--horizontal {
    .ww-timeline__container {
      display: flex;
      position: relative;
      padding: 40px 20px 20px;
      overflow-x: auto;
      width: 100%; /* Ensure the container takes full width */
    }

    .ww-timeline__event {
      position: relative;
      flex: 0 0 auto; /* Don't allow event to grow or shrink */
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .ww-timeline__content {
      width: auto; /* Allow content to size to its children */
      flex: 0 0 auto; /* Prevent flex growing/shrinking */
    }

    /* Top alignment (default) */
    &.ww-timeline--align-top {
      .ww-timeline__container {
        padding-top: calc(40px + calc(var(--marker-size) / 2));

        &::before {
          content: "";
          position: absolute;
          top: calc(8px + calc(var(--marker-size) / 2));
          left: 20px;
          right: 20px;
          height: var(--connector-width);
          transform: translateY(
            calc(-1 * var(--connector-width) / 2)
          ); /* Center the connector regardless of width */
          background-color: var(--connector-color);
        }
      }

      .ww-timeline__marker {
        position: absolute;
        top: -32px; /* Position relative to connector */
        left: 50%;
        transform: translate(
          -50%,
          -50%
        ); /* Center the marker on the connector */
      }

      .ww-timeline__content {
        justify-content: center;
        text-align: center;
      }
    }

    /* Bottom alignment */
    &.ww-timeline--align-bottom {
      .ww-timeline__container {
        padding-top: 20px;
        padding-bottom: calc(40px + calc(var(--marker-size) / 2));

        &::before {
          content: "";
          position: absolute;
          bottom: calc(8px + calc(var(--marker-size) / 2));
          left: 20px;
          right: 20px;
          height: var(--connector-width);
          transform: translateY(
            calc(var(--connector-width) / 2)
          ); /* Center the connector regardless of width */
          background-color: var(--connector-color);
        }
      }

      .ww-timeline__marker {
        position: absolute;
        bottom: -32px; /* Position relative to connector */
        left: 50%;
        transform: translate(
          -50%,
          50%
        ); /* Center the marker on the connector */
      }

      .ww-timeline__content {
        justify-content: center;
        text-align: center;
      }
    }
  }
}

.ww-timeline__marker {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--marker-size);
  height: var(--marker-size);
  background-color: var(--marker-background-color);
  z-index: 2;
  cursor: pointer;
  /* No transition or hover effect */

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: 2px;
  }
}

.ww-timeline__marker-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--marker-icon-size);
  height: var(--marker-icon-size);
  color: var(--marker-icon-color);

  :deep(svg) {
    width: 100% !important;
    height: 100% !important;
  }
}

.ww-timeline__content {
  cursor: pointer;
  display: flex;
  /* Allow the content to adapt to its children's size */
  width: auto;
}

.ww-timeline__content-element {
  /* Base styles for the content element */
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  /* This ensures any width/height set on the element will be respected */
  width: inherit; /* Inherit any width set on this element */
  height: inherit; /* Inherit any height set on this element */
}

/* Different alignment depending on timeline layout and alignment */
.ww-timeline--vertical {
  &.ww-timeline--align-left .ww-timeline__content-element {
    align-items: flex-start;
  }
  
  &.ww-timeline--align-right .ww-timeline__content-element {
    align-items: flex-end;
  }
  
  &.ww-timeline--align-alternate {
    .ww-timeline__content-element {
      align-items: flex-end;
    }
    
    .ww-timeline__event--alternate .ww-timeline__content-element {
      align-items: flex-start;
    }
  }
}

.ww-timeline--horizontal .ww-timeline__content-element {
  align-items: center;
}
</style>
