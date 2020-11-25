import type { ITransactionDetail } from '@mammoth-apps/api-interfaces'
import { PieDatum, ResponsivePie } from '@nivo/pie'
import { format } from 'date-fns'
import React from 'react'

interface IPieSlice extends PieDatum {
  id: string
  label: string
  value: number
}

interface ICategoryBreakdownProps {
  transactions: ITransactionDetail[]
}

const today = new Date()
const monthStart = new Date()
monthStart.setDate(1)

export const CategorySpendingViewGraph = ({
  transactions,
}: ICategoryBreakdownProps) => {
  let accumulatedTotal = 0
  const transactionsInRangeRecordMap = transactions
    .filter((transaction) => {
      const { date } = transaction
      const isCorrectMonth = date.month === today.getMonth() + 1
      const isPastTransaction = date.day <= today.getDate()
      const isCorrectYear = date.year === today.getFullYear()
      const isOutflow = (transaction.outflow ?? 0) <= 0
      return isCorrectMonth && isPastTransaction && isCorrectYear && isOutflow
    })
    .reduce((record, transaction) => {
      const outflowAbs = Math.abs(transaction.outflow ?? 0)
      if (record[transaction.category.id]) {
        record[transaction.category.id].value += outflowAbs
      } else {
        record[transaction.category.id] = {
          id: transaction.category.id,
          label: transaction.category.value,
          value: outflowAbs,
        }
      }
      accumulatedTotal += outflowAbs
      return record
    }, {} as Record<string, IPieSlice>)

  if (Object.keys(transactionsInRangeRecordMap).length === 0) {
    return <div>No Transaction spending in month range yet.</div>
  }

  return (
    <div style={{ height: 400 }}>
      <span>
        Total Spending between {format(monthStart, 'MM/dd/yyyy')} -{' '}
        {format(today, 'MM/dd/yyyy')}
        <strong> (${accumulatedTotal.toFixed(2)})</strong>
      </span>
      <ResponsivePie
        data={Object.values(transactionsInRangeRecordMap)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabel={'label'}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        sliceLabel={(data) => `$${data.value}`}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  )
}
