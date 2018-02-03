export default async (ctx) => {
  await ctx.store.dispatch('auth/hydrate')
}
