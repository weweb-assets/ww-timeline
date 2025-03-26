<template>
    <div 
        class="ww-timeline" 
        :class="[
            `ww-timeline--${content.timelineLayout}`,
            `ww-timeline--align-${content.timelineLayout === 'vertical' ? content.eventsAlignmentVertical : content.eventsAlignmentHorizontal}`
        ]"
    >
        <div 
            class="ww-timeline__container"
            :style="{
                '--connector-color': content.connectorColor,
                '--connector-width': content.connectorWidth,
            }"
        >
            <div 
                v-for="(item, index) in content.data" 
                :key="index"
                class="ww-timeline__event"
                :class="{ 'ww-timeline__event--alternate': content.timelineLayout === 'vertical' && content.eventsAlignmentVertical === 'alternate' && index % 2 === 1 }"
            >
                <wwLayoutItemContext is-repeat :index="index" :data="item">
                    <!-- Event marker -->
                    <div 
                        class="ww-timeline__marker"
                        :class="[`ww-timeline__marker--${content.markerShape}`]"
                        :style="{
                            backgroundColor: content.markerBackgroundColor,
                        }"
                        @click="onMarkerClick(item)"
                    >
                        <wwElement 
                            v-if="content.markerIconOnOff && content.markerIcon"
                            :ww-props="{ icon: content.markerIcon, color: content.markerIconColor }"
                            v-bind="content.markerIconElement"
                            class="ww-timeline__marker-icon"
                        />
                    </div>

                    <!-- Event content -->
                    <div 
                        class="ww-timeline__content"
                        @click="onClick(item)"
                    >
                        <wwElement
                            v-bind="content.timelineElement"
                            :style="{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                alignItems: 'flex-start'
                            }"
                        />
                    </div>
                </wwLayoutItemContext>
            </div>
        </div>
    </div>
</template>

<script>
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
    emits: ['trigger-event'],
    methods: {
        onClick(item) {
            this.$emit('trigger-event', { name: 'click', event: { value: item } });
        },
        onMarkerClick(item) {
            this.$emit('trigger-event', { name: 'markerClick', event: { value: item } });
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
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 8px; /* Position at 8px from the left edge */
                    width: var(--connector-width);
                    transform: translateX(calc(-1 * var(--connector-width) / 2)); /* Center the connector regardless of width */
                    background-color: var(--connector-color);
                }
            }
            
            .ww-timeline__marker {
                position: absolute;
                left: -32px; /* Adjusted to center on the connector */
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
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 8px; /* Position at 8px from the right edge */
                    width: var(--connector-width);
                    transform: translateX(calc(var(--connector-width) / 2)); /* Center the connector regardless of width */
                    background-color: var(--connector-color);
                }
            }
            
            .ww-timeline__marker {
                position: absolute;
                right: -32px; /* Adjusted to center on the connector */
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
                    content: '';
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
        }

        .ww-timeline__event {
            position: relative;
            min-width: 200px;
            margin: 0 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Top alignment (default) */
        &.ww-timeline--align-top {
            .ww-timeline__container {
                padding-top: 40px;
                
                &::before {
                    content: '';
                    position: absolute;
                    top: 8px; /* Position at 8px from the top edge */
                    left: 20px;
                    right: 20px;
                    height: var(--connector-width);
                    transform: translateY(calc(-1 * var(--connector-width) / 2)); /* Center the connector regardless of width */
                    background-color: var(--connector-color);
                }
            }
            
            .ww-timeline__marker {
                position: absolute;
                top: -32px; /* Adjusted to center on the connector */
                left: 50%;
                transform: translate(-50%, -50%); /* Center the marker on the connector */
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
                padding-bottom: 40px;
                
                &::before {
                    content: '';
                    position: absolute;
                    bottom: 8px; /* Position at 8px from the bottom edge */
                    left: 20px;
                    right: 20px;
                    height: var(--connector-width);
                    transform: translateY(calc(var(--connector-width) / 2)); /* Center the connector regardless of width */
                    background-color: var(--connector-color);
                }
            }
            
            .ww-timeline__marker {
                position: absolute;
                bottom: -32px; /* Adjusted to center on the connector */
                left: 50%;
                transform: translate(-50%, 50%); /* Center the marker on the connector */
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
    width: 16px;
    height: 16px;
    z-index: 2;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.1) !important; /* Override the transform for centering when hovering */
    }

    &--circle {
        border-radius: 50%;
    }

    &--square {
        border-radius: 2px;
    }
}

.ww-timeline__marker-icon {
    width: 12px;
    height: 12px;
}

.ww-timeline__content {
    cursor: pointer;
    display: flex;
    width: 100%;
}
</style>
