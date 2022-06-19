import { ComponentType } from "react"

const foo = <P extends object>(Cmp:ComponentType<P>) => (props:P) => {
    return <div className="border">
        <Cmp {...props} />
    </div>
}

function Child() {
    return <div>Child</div>
}

const Foo = foo(foo(Child))

export default Foo