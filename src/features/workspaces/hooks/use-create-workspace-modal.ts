import { useQueryState, parseAsBoolean } from "nuqs"
export const useCreateWorkspaceModal = () => {
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",
        parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
    )

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return {
        isOpen,
        open,
        close,
        setIsOpen
    }
}


/* 这段代码实现了一个用于控制创建工作空间模态框显示状态的逻辑，isOpen 是布尔值，表示模态框是否打开。如果 URL 查询参数 ?create-workspace=true 存在，isOpen 将为 true，否则为 false。通过调用 setIsOpen，你可以更新该状态，同时也会同步更新 URL 查询参数。

例如：

如果 URL 为 http://example.com/?create-workspace=true，那么 isOpen 的值将是 true。
如果 URL 为 http://example.com/，那么 isOpen 的值将是 false。
这个模式很适用于需要根据 URL 状态来控制 UI 元素（如模态框）的场景，尤其是在单页应用（SPA）中，通过查询参数来分享页面状态。 */