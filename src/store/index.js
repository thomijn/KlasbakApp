import axios from "axios"
import create from 'zustand'

axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.delete['Accept'] = 'application/json'
axios.defaults.headers.put['Accept'] = 'application/json'

export const [useStore] = create(set => {
    return {
        bins: [
            {
                name: "Plastic bak",
                weight: "2132 gram",
                percentage: "32.9%"
            },
            {
                name: "Restafval bak",
                weight: "3521 gram",
                percentage: "54.4%"
            },
            {
                name: "Papier bak",
                weight: "821 gram",
                percentage: "12.7%"
            },
        ],
        selectedBin: undefined,
        page: "home",
        setSelectedBin: bin => set({ selectedBin: bin }),
        setPage: page => set({ page: page })

    }
})

