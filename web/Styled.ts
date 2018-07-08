import styles, { StyleRulesCallback, WithStylesOptions,
  CSSProperties } from '@material-ui/core/styles/withStyles'

export default <ClassKey extends string>(
  style: Record<ClassKey, CSSProperties> | StyleRulesCallback<ClassKey>,
  options?: WithStylesOptions<ClassKey>
) => styles(style, options) as any
