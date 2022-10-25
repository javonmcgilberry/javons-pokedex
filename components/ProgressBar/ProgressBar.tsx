import * as React from 'react'

const ProgressBar = ({
  color,
  statValue,
  maxValue,
}: {
  color: string | undefined
  statValue: number
  maxValue: number
}) => {
  return (
    <div className={`mb-6 h-2 w-full rounded-md bg-slate-100`}>
      <div
        className={`h-2 rounded ${color}`}
        style={{ width: `${(statValue / maxValue) * 100}%` }}
      ></div>
    </div>
  )
}
export default ProgressBar
