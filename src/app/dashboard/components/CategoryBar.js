"use client";

import React from "react";
import { AvailableChartColors, getColorClassName } from "../../lib/utils/chartColors";
import { cx } from "../../lib/utils/cx";
import { Tooltip } from "./Tooltip";

const getMarkerBgColor = (marker, values, colors) => {
  if (marker === undefined) return "";

  if (marker === 0) {
    for (let index = 0; index < values.length; index++) {
      if (values[index] > 0) {
        return getColorClassName(colors[index], "bg");
      }
    }
  }

  let prefixSum = 0;
  for (let index = 0; index < values.length; index++) {
    prefixSum += values[index];
    if (prefixSum >= marker) {
      return getColorClassName(colors[index], "bg");
    }
  }

  return getColorClassName(colors[values.length - 1], "bg");
};

const getPositionLeft = (value, maxValue) => (value ? (value / maxValue) * 100 : 0);

const sumNumericArray = (arr) => arr.reduce((prefixSum, num) => prefixSum + num, 0);

const CategoryBar = ({ 
  values, 
  marker, 
  colors = ["emerald", "amber", "pink"], 
  maxValue,
  className 
}) => {
  const effectiveMaxValue = maxValue || Math.max(...values);
  
  const colorValues = {
    emerald: "#10B981",
    amber: "#F59E0B",
    pink: "#EC4899"
  };

  return (
    <div style={{
      width: '100%',
      height: '32px',
      margin: '8px 0',
    }}>
      <div style={{
        position: 'relative',
        height: '8px',
        width: '100%',
        borderRadius: '9999px',
        backgroundColor: '#E5E7EB',
        overflow: 'hidden',
      }}>
        {values.map((value, index) => {
          const leftPosition = index === 0 ? 0 : sumNumericArray(values.slice(0, index));
          const width = (value / effectiveMaxValue) * 100;
          
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                height: '100%',
                left: `${(leftPosition / effectiveMaxValue) * 100}%`,
                width: `${width}%`,
                minWidth: '1px',
                backgroundColor: colorValues[colors[index]] || '#6B7280',
                borderRadius: index === 0 ? '9999px 0 0 9999px' : 
                            index === values.length - 1 ? '0 9999px 9999px 0' : '',
              }}
            />
          );
        })}
        
        {marker && (
          <Tooltip content={marker.tooltip}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                height: '16px',
                width: '2px',
                transform: 'translate(-50%, -50%)',
                backgroundColor: colorValues[colors[Math.floor(marker.value / (effectiveMaxValue / 3))]] || '#6B7280',
                left: `${(marker.value / effectiveMaxValue) * 100}%`,
                zIndex: 10,
              }}
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;

// const formatNumber = (num) => {
//   if (Number.isInteger(num)) {
//     return num.toString();
//   }
//   return num.toFixed(1);
// };

// const BarLabels = ({ values }) => {
//   const sumValues = React.useMemo(() => sumNumericArray(values), [values]);
//   let prefixSum = 0;
//   let sumConsecutiveHiddenLabels = 0;

//   return (
//     <div className={cx("relative mb-2 flex h-5 w-full text-sm font-medium", "text-gray-700 dark:text-gray-300")}>
//       <div className="absolute bottom-0 left-0 flex items-center">0</div>
//       {values.map((widthPercentage, index) => {
//         prefixSum += widthPercentage;

//         const showLabel =
//           (widthPercentage >= 0.1 * sumValues ||
//             sumConsecutiveHiddenLabels >= 0.09 * sumValues) &&
//           sumValues - prefixSum >= 0.1 * sumValues &&
//           prefixSum >= 0.1 * sumValues &&
//           prefixSum < 0.9 * sumValues;

//         sumConsecutiveHiddenLabels = showLabel ? 0 : (sumConsecutiveHiddenLabels += widthPercentage);

//         const widthPositionLeft = getPositionLeft(widthPercentage, sumValues);

//         return (
//           <div key={`item-${index}`} className="flex items-center justify-end pr-0.5" style={{ width: `${widthPositionLeft}%` }}>
//             {showLabel ? (
//               <span className={cx("block translate-x-1/2 text-sm tabular-nums")}>{formatNumber(prefixSum)}</span>
//             ) : null}
//           </div>
//         );
//       })}
//       <div className="absolute bottom-0 right-0 flex items-center">{formatNumber(sumValues)}</div>
//     </div>
//   );
// };

// const CategoryBar = React.forwardRef(({ values = [], colors = AvailableChartColors, marker, showLabels = true, className, ...props }, forwardedRef) => {
//   const markerBgColor = React.useMemo(() => getMarkerBgColor(marker?.value, values, colors), [marker, values, colors]);
//   const maxValue = React.useMemo(() => sumNumericArray(values), [values]);

//   const adjustedMarkerValue = React.useMemo(() => {
//     if (marker === undefined) return undefined;
//     if (marker.value < 0) return 0;
//     if (marker.value > maxValue) return maxValue;
//     return marker.value;
//   }, [marker, maxValue]);

//   const markerPositionLeft = React.useMemo(() => getPositionLeft(adjustedMarkerValue, maxValue), [adjustedMarkerValue, maxValue]);

//   return (
//     <div ref={forwardedRef} className={cx(className)} aria-label="Category bar" aria-valuenow={marker?.value} tremor-id="tremor-raw" {...props}>
//       {showLabels ? <BarLabels values={values} /> : null}
//       <div className="relative flex h-2 w-full items-center">
//         <div className="flex h-full flex-1 items-center gap-0.5 overflow-hidden rounded-full">
//           {values.map((value, index) => {
//             const barColor = colors[index] ?? "gray";
//             const percentage = (value / maxValue) * 100;
//             return (
//               <div key={`item-${index}`} className={cx("h-full", getColorClassName(barColor, "bg"), percentage === 0 && "hidden")} style={{ width: `${percentage}%` }} />
//             );
//           })}
//         </div>

//         {marker !== undefined ? (
//           <div className={cx("absolute w-2 -translate-x-1/2", marker.showAnimation && "transform-gpu transition-all duration-300 ease-in-out")} style={{ left: `${markerPositionLeft}%` }}>
//             {marker.tooltip ? (
//               <Tooltip asChild content={marker.tooltip}>
//                 <div aria-hidden="true" className={cx("relative mx-auto h-4 w-1 rounded-full ring-2", "ring-white dark:ring-gray-950", markerBgColor)} />
//               </Tooltip>
//             ) : (
//               <div className={cx("mx-auto h-4 w-1 rounded-full ring-2", "ring-white dark:ring-gray-950", markerBgColor)} />
//             )}
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// });

// CategoryBar.displayName = "CategoryBar";

export { CategoryBar };
