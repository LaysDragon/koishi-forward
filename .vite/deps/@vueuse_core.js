import {
  DefaultMagicKeysAliasMap,
  StorageSerializers,
  SwipeDirection,
  TransitionPresets,
  __onlyVue3,
  assert,
  breakpointsAntDesign,
  breakpointsBootstrapV5,
  breakpointsQuasar,
  breakpointsSematic,
  breakpointsTailwind,
  breakpointsVuetify,
  bypassFilter,
  clamp,
  computedAsync,
  computedEager,
  computedInject,
  computedWithControl,
  containsProp,
  controlledRef,
  createEventHook,
  createFetch,
  createFilterWrapper,
  createGlobalState,
  createInjectionState,
  createSharedComposable,
  createSingletonPromise,
  createUnrefFn,
  debounceFilter,
  defaultDocument,
  defaultLocation,
  defaultNavigator,
  defaultWindow,
  directiveHooks,
  extendRef,
  formatDate,
  get,
  getSSRHandler,
  identity,
  increaseWithUnit,
  invoke,
  isBoolean,
  isClient,
  isDef,
  isDefined,
  isFunction,
  isIOS,
  isNumber,
  isObject,
  isString,
  isWindow,
  logicAnd,
  logicNot,
  logicOr,
  makeDestructurable,
  mapGamepadToXbox360Controller,
  noop,
  normalizeDate,
  now,
  objectPick,
  onClickOutside,
  onKeyDown,
  onKeyPressed,
  onKeyStroke,
  onKeyUp,
  onLongPress,
  onStartTyping,
  pausableFilter,
  promiseTimeout,
  rand,
  reactify,
  reactifyObject,
  reactiveComputed,
  reactiveOmit,
  reactivePick,
  refAutoReset,
  refDebounced,
  refDefault,
  refThrottled,
  refWithControl,
  resolveRef,
  resolveUnref,
  set,
  setSSRHandler,
  syncRef,
  syncRefs,
  templateRef,
  throttleFilter,
  timestamp,
  toReactive,
  toRefs,
  tryOnBeforeMount,
  tryOnBeforeUnmount,
  tryOnMounted,
  tryOnScopeDispose,
  tryOnUnmounted,
  unrefElement,
  until,
  useActiveElement,
  useAsyncQueue,
  useAsyncState,
  useBase64,
  useBattery,
  useBluetooth,
  useBreakpoints,
  useBroadcastChannel,
  useBrowserLocation,
  useCached,
  useClamp,
  useClipboard,
  useColorMode,
  useConfirmDialog,
  useCounter,
  useCssVar,
  useCurrentElement,
  useCycleList,
  useDark,
  useDateFormat,
  useDebounceFn,
  useDebouncedRefHistory,
  useDeviceMotion,
  useDeviceOrientation,
  useDevicePixelRatio,
  useDevicesList,
  useDisplayMedia,
  useDocumentVisibility,
  useDraggable,
  useDropZone,
  useElementBounding,
  useElementByPoint,
  useElementHover,
  useElementSize,
  useElementVisibility,
  useEventBus,
  useEventListener,
  useEventSource,
  useEyeDropper,
  useFavicon,
  useFetch,
  useFileDialog,
  useFileSystemAccess,
  useFocus,
  useFocusWithin,
  useFps,
  useFullscreen,
  useGamepad,
  useGeolocation,
  useIdle,
  useImage,
  useInfiniteScroll,
  useIntersectionObserver,
  useInterval,
  useIntervalFn,
  useKeyModifier,
  useLastChanged,
  useLocalStorage,
  useMagicKeys,
  useManualRefHistory,
  useMediaControls,
  useMediaQuery,
  useMemoize,
  useMemory,
  useMounted,
  useMouse,
  useMouseInElement,
  useMousePressed,
  useMutationObserver,
  useNavigatorLanguage,
  useNetwork,
  useNow,
  useObjectUrl,
  useOffsetPagination,
  useOnline,
  usePageLeave,
  useParallax,
  usePermission,
  usePointer,
  usePointerSwipe,
  usePreferredColorScheme,
  usePreferredDark,
  usePreferredLanguages,
  useRafFn,
  useRefHistory,
  useResizeObserver,
  useScreenOrientation,
  useScreenSafeArea,
  useScriptTag,
  useScroll,
  useScrollLock,
  useSessionStorage,
  useShare,
  useSpeechRecognition,
  useSpeechSynthesis,
  useStepper,
  useStorage,
  useStorageAsync,
  useStyleTag,
  useSwipe,
  useTemplateRefsList,
  useTextSelection,
  useTextareaAutosize,
  useThrottleFn,
  useThrottledRefHistory,
  useTimeAgo,
  useTimeout,
  useTimeoutFn,
  useTimeoutPoll,
  useTimestamp,
  useTitle,
  useToggle,
  useTransition,
  useUrlSearchParams,
  useUserMedia,
  useVModel,
  useVModels,
  useVibrate,
  useVirtualList,
  useWakeLock,
  useWebNotification,
  useWebSocket,
  useWebWorker,
  useWebWorkerFn,
  useWindowFocus,
  useWindowScroll,
  useWindowSize,
  watchArray,
  watchAtMost,
  watchDebounced,
  watchIgnorable,
  watchOnce,
  watchPausable,
  watchThrottled,
  watchTriggerable,
  watchWithFilter,
  whenever
} from "./chunk-WW3H7SQG.js";
import "./chunk-TUTPZM3B.js";
import "./chunk-TWLJ45QX.js";
export {
  DefaultMagicKeysAliasMap,
  StorageSerializers,
  SwipeDirection,
  TransitionPresets,
  __onlyVue3,
  logicAnd as and,
  assert,
  computedAsync as asyncComputed,
  refAutoReset as autoResetRef,
  breakpointsAntDesign,
  breakpointsBootstrapV5,
  breakpointsQuasar,
  breakpointsSematic,
  breakpointsTailwind,
  breakpointsVuetify,
  bypassFilter,
  clamp,
  computedAsync,
  computedEager,
  computedInject,
  computedWithControl,
  containsProp,
  computedWithControl as controlledComputed,
  controlledRef,
  createEventHook,
  createFetch,
  createFilterWrapper,
  createGlobalState,
  createInjectionState,
  reactify as createReactiveFn,
  createSharedComposable,
  createSingletonPromise,
  createUnrefFn,
  debounceFilter,
  refDebounced as debouncedRef,
  watchDebounced as debouncedWatch,
  defaultDocument,
  defaultLocation,
  defaultNavigator,
  defaultWindow,
  directiveHooks,
  computedEager as eagerComputed,
  extendRef,
  formatDate,
  get,
  getSSRHandler,
  identity,
  watchIgnorable as ignorableWatch,
  increaseWithUnit,
  invoke,
  isBoolean,
  isClient,
  isDef,
  isDefined,
  isFunction,
  isIOS,
  isNumber,
  isObject,
  isString,
  isWindow,
  logicAnd,
  logicNot,
  logicOr,
  makeDestructurable,
  mapGamepadToXbox360Controller,
  noop,
  normalizeDate,
  logicNot as not,
  now,
  objectPick,
  onClickOutside,
  onKeyDown,
  onKeyPressed,
  onKeyStroke,
  onKeyUp,
  onLongPress,
  onStartTyping,
  logicOr as or,
  pausableFilter,
  watchPausable as pausableWatch,
  promiseTimeout,
  rand,
  reactify,
  reactifyObject,
  reactiveComputed,
  reactiveOmit,
  reactivePick,
  refAutoReset,
  refDebounced,
  refDefault,
  refThrottled,
  refWithControl,
  resolveRef,
  resolveUnref,
  set,
  setSSRHandler,
  syncRef,
  syncRefs,
  templateRef,
  throttleFilter,
  refThrottled as throttledRef,
  watchThrottled as throttledWatch,
  timestamp,
  toReactive,
  toRefs,
  tryOnBeforeMount,
  tryOnBeforeUnmount,
  tryOnMounted,
  tryOnScopeDispose,
  tryOnUnmounted,
  unrefElement,
  until,
  useActiveElement,
  useAsyncQueue,
  useAsyncState,
  useBase64,
  useBattery,
  useBluetooth,
  useBreakpoints,
  useBroadcastChannel,
  useBrowserLocation,
  useCached,
  useClamp,
  useClipboard,
  useColorMode,
  useConfirmDialog,
  useCounter,
  useCssVar,
  useCurrentElement,
  useCycleList,
  useDark,
  useDateFormat,
  refDebounced as useDebounce,
  useDebounceFn,
  useDebouncedRefHistory,
  useDeviceMotion,
  useDeviceOrientation,
  useDevicePixelRatio,
  useDevicesList,
  useDisplayMedia,
  useDocumentVisibility,
  useDraggable,
  useDropZone,
  useElementBounding,
  useElementByPoint,
  useElementHover,
  useElementSize,
  useElementVisibility,
  useEventBus,
  useEventListener,
  useEventSource,
  useEyeDropper,
  useFavicon,
  useFetch,
  useFileDialog,
  useFileSystemAccess,
  useFocus,
  useFocusWithin,
  useFps,
  useFullscreen,
  useGamepad,
  useGeolocation,
  useIdle,
  useImage,
  useInfiniteScroll,
  useIntersectionObserver,
  useInterval,
  useIntervalFn,
  useKeyModifier,
  useLastChanged,
  useLocalStorage,
  useMagicKeys,
  useManualRefHistory,
  useMediaControls,
  useMediaQuery,
  useMemoize,
  useMemory,
  useMounted,
  useMouse,
  useMouseInElement,
  useMousePressed,
  useMutationObserver,
  useNavigatorLanguage,
  useNetwork,
  useNow,
  useObjectUrl,
  useOffsetPagination,
  useOnline,
  usePageLeave,
  useParallax,
  usePermission,
  usePointer,
  usePointerSwipe,
  usePreferredColorScheme,
  usePreferredDark,
  usePreferredLanguages,
  useRafFn,
  useRefHistory,
  useResizeObserver,
  useScreenOrientation,
  useScreenSafeArea,
  useScriptTag,
  useScroll,
  useScrollLock,
  useSessionStorage,
  useShare,
  useSpeechRecognition,
  useSpeechSynthesis,
  useStepper,
  useStorage,
  useStorageAsync,
  useStyleTag,
  useSwipe,
  useTemplateRefsList,
  useTextSelection,
  useTextareaAutosize,
  refThrottled as useThrottle,
  useThrottleFn,
  useThrottledRefHistory,
  useTimeAgo,
  useTimeout,
  useTimeoutFn,
  useTimeoutPoll,
  useTimestamp,
  useTitle,
  useToggle,
  useTransition,
  useUrlSearchParams,
  useUserMedia,
  useVModel,
  useVModels,
  useVibrate,
  useVirtualList,
  useWakeLock,
  useWebNotification,
  useWebSocket,
  useWebWorker,
  useWebWorkerFn,
  useWindowFocus,
  useWindowScroll,
  useWindowSize,
  watchArray,
  watchAtMost,
  watchDebounced,
  watchIgnorable,
  watchOnce,
  watchPausable,
  watchThrottled,
  watchTriggerable,
  watchWithFilter,
  whenever
};
//# sourceMappingURL=@vueuse_core.js.map
