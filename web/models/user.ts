export const user = {
  state: { profiles: [{ uuid: 'a', name: 'Shirasawa' }] },
  reducers: {
    $profile (state, payload) {
      return state + payload
    }
  },
  effects: {
    // async profile (payload, rootState) {
    //   await new Promise(resolve => setTimeout(resolve, 1000))
    //   this.increment(payload)
    // }
  }
}
