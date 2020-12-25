import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.store = options.store
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.unsubscribers = []

        this.prepare()
    }

    // настраивает компонент до init
    prepare() {

    }

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // уведомление подписчиков о событии event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // подписка на event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // приходят изменения по тем полям, на которые мы подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // инициализируем компонент + дом слушатели
    init() {
        this.initDOMListeners()
    }

    // удаляем компонент + чистим подписчиков
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}