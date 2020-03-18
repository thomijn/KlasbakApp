import create from 'zustand'

export const [useStore] = create(set => {
    return {
        page: "home",
        rotate: false,
        setRotate: bool => set({ rotate: bool }),
        answer: true,
        setAnswer: bool => set({ answer: bool }),
        setPage: page => set({ page: page })
    }
})

