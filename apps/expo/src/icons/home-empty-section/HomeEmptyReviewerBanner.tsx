import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
import { FC } from "react";

const HomeEmptyReviewerBanner: FC<SvgProps> = (props) => (
  <Svg width={351} height={128} viewBox="0 0 371 128" fill="none" {...props}>
    <Rect width={371} height={128} rx={8} fill="#6949FF" fillOpacity={0.1} />
    <Path
      d="M23.466 52.144c-.348 0-.618-.096-.81-.288-.18-.192-.27-.468-.27-.828v-10.71c0-.372.09-.654.27-.846a.969.969 0 01.738-.306c.276 0 .48.054.612.162.144.096.312.264.504.504l6.894 8.946h-.468v-8.514c0-.348.09-.618.27-.81.192-.192.462-.288.81-.288.348 0 .612.096.792.288.18.192.27.462.27.81v10.8c0 .336-.084.6-.252.792-.168.192-.396.288-.684.288-.276 0-.498-.054-.666-.162a2.65 2.65 0 01-.522-.522l-6.876-8.946h.45v8.514c0 .36-.09.636-.27.828-.18.192-.444.288-.792.288zm16.183.036c-.912 0-1.704-.186-2.376-.558a3.903 3.903 0 01-1.566-1.584c-.372-.696-.558-1.512-.558-2.448 0-.708.102-1.338.306-1.89a4.06 4.06 0 01.918-1.44c.396-.408.87-.714 1.422-.918.552-.216 1.17-.324 1.854-.324.912 0 1.704.186 2.376.558.672.372 1.194.9 1.566 1.584.372.684.558 1.494.558 2.43 0 .708-.108 1.344-.324 1.908a4.034 4.034 0 01-.9 1.458c-.396.396-.87.702-1.422.918-.552.204-1.17.306-1.854.306zm0-1.71c.444 0 .834-.108 1.17-.324.336-.216.594-.534.774-.954.192-.432.288-.966.288-1.602 0-.96-.204-1.674-.612-2.142-.408-.48-.948-.72-1.62-.72-.444 0-.834.108-1.17.324-.336.204-.6.522-.792.954-.18.42-.27.948-.27 1.584 0 .948.204 1.668.612 2.16.408.48.948.72 1.62.72zm12.396 1.674c-.372 0-.66-.096-.864-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.134h-.18c.168-.72.498-1.266.99-1.638.492-.372 1.146-.594 1.962-.666.252-.024.45.042.594.198.156.144.246.372.27.684.024.3-.048.546-.216.738-.156.18-.396.288-.72.324l-.396.036c-.732.072-1.284.3-1.656.684-.372.372-.558.9-.558 1.584v3.726c0 .372-.096.66-.288.864-.192.192-.474.288-.846.288zm10.094.036c-.996 0-1.854-.186-2.574-.558a4.024 4.024 0 01-1.674-1.584c-.384-.684-.576-1.494-.576-2.43 0-.912.186-1.71.558-2.394a4.186 4.186 0 011.566-1.602c.672-.396 1.434-.594 2.286-.594.624 0 1.182.102 1.674.306.504.204.93.498 1.278.882.36.384.63.852.81 1.404.192.54.288 1.152.288 1.836a.6.6 0 01-.234.504c-.144.108-.354.162-.63.162h-5.778v-1.296h5.058l-.288.27c0-.552-.084-1.014-.252-1.386a1.757 1.757 0 00-.702-.846c-.3-.204-.678-.306-1.134-.306-.504 0-.936.12-1.296.36-.348.228-.618.558-.81.99-.18.42-.27.924-.27 1.512v.126c0 .984.228 1.722.684 2.214.468.48 1.152.72 2.052.72.312 0 .66-.036 1.044-.108a4.026 4.026 0 001.116-.414c.252-.144.474-.204.666-.18a.63.63 0 01.45.198c.12.12.192.27.216.45a.843.843 0 01-.108.522c-.084.18-.234.336-.45.468-.42.264-.906.462-1.458.594-.54.12-1.044.18-1.512.18zm8.841-.036c-.3 0-.564-.078-.792-.234-.216-.156-.396-.396-.54-.72l-2.862-6.642a1.524 1.524 0 01-.126-.738.797.797 0 01.324-.54c.192-.144.45-.216.774-.216.276 0 .498.066.666.198.168.12.318.354.45.702l2.43 6.066h-.54l2.502-6.084c.132-.336.282-.564.45-.684.18-.132.42-.198.72-.198.264 0 .474.072.63.216a.854.854 0 01.288.54c.036.216-.006.456-.126.72l-2.916 6.66c-.132.324-.312.564-.54.72-.216.156-.48.234-.792.234zm7.044-.018c-.36 0-.636-.108-.828-.324-.192-.216-.288-.516-.288-.9v-6.606c0-.396.096-.696.288-.9.192-.216.468-.324.828-.324.36 0 .636.108.828.324.204.204.306.504.306.9v6.606c0 .384-.096.684-.288.9-.192.216-.474.324-.846.324zm0-10.728c-.42 0-.75-.102-.99-.306-.228-.216-.342-.51-.342-.882 0-.384.114-.678.342-.882.24-.204.57-.306.99-.306.432 0 .762.102.99.306.228.204.342.498.342.882 0 .372-.114.666-.342.882-.228.204-.558.306-.99.306zm7.81 10.782c-.996 0-1.854-.186-2.574-.558a4.024 4.024 0 01-1.674-1.584c-.384-.684-.576-1.494-.576-2.43 0-.912.186-1.71.558-2.394a4.186 4.186 0 011.566-1.602c.672-.396 1.434-.594 2.286-.594.624 0 1.182.102 1.674.306.504.204.93.498 1.278.882.36.384.63.852.81 1.404.192.54.288 1.152.288 1.836a.6.6 0 01-.234.504c-.144.108-.354.162-.63.162h-5.778v-1.296h5.058l-.288.27c0-.552-.084-1.014-.252-1.386a1.757 1.757 0 00-.702-.846c-.3-.204-.678-.306-1.134-.306-.504 0-.936.12-1.296.36-.348.228-.618.558-.81.99-.18.42-.27.924-.27 1.512v.126c0 .984.228 1.722.684 2.214.468.48 1.152.72 2.052.72.312 0 .66-.036 1.044-.108a4.026 4.026 0 001.116-.414c.252-.144.474-.204.666-.18a.63.63 0 01.45.198c.12.12.192.27.216.45a.843.843 0 01-.108.522c-.084.18-.234.336-.45.468-.42.264-.906.462-1.458.594-.54.12-1.044.18-1.512.18zm8.68-.036c-.3 0-.559-.072-.775-.216-.216-.156-.39-.396-.522-.72l-2.61-6.66c-.108-.288-.144-.54-.108-.756a.867.867 0 01.342-.54c.18-.132.42-.198.72-.198.264 0 .48.066.648.198.168.12.312.354.432.702l2.178 5.994h-.414l2.25-6.138c.096-.264.222-.456.378-.576.168-.12.384-.18.648-.18s.48.066.648.198c.168.12.294.306.378.558l2.214 6.138h-.378l2.196-6.048c.12-.324.27-.546.45-.666.192-.12.402-.18.63-.18.288 0 .51.072.666.216.156.144.246.33.27.558.024.216-.018.456-.126.72l-2.592 6.66c-.12.312-.294.546-.522.702a1.286 1.286 0 01-.774.234c-.3 0-.564-.078-.792-.234-.216-.156-.384-.39-.504-.702l-2.358-6.246h1.026L95.81 51.19c-.12.324-.288.564-.504.72-.216.156-.48.234-.792.234zm16.105.036c-.996 0-1.854-.186-2.574-.558a4.024 4.024 0 01-1.674-1.584c-.384-.684-.576-1.494-.576-2.43 0-.912.186-1.71.558-2.394a4.186 4.186 0 011.566-1.602c.672-.396 1.434-.594 2.286-.594.624 0 1.182.102 1.674.306.504.204.93.498 1.278.882.36.384.63.852.81 1.404.192.54.288 1.152.288 1.836a.6.6 0 01-.234.504c-.144.108-.354.162-.63.162h-5.778v-1.296h5.058l-.288.27c0-.552-.084-1.014-.252-1.386a1.757 1.757 0 00-.702-.846c-.3-.204-.678-.306-1.134-.306-.504 0-.936.12-1.296.36-.348.228-.618.558-.81.99-.18.42-.27.924-.27 1.512v.126c0 .984.228 1.722.684 2.214.468.48 1.152.72 2.052.72.312 0 .66-.036 1.044-.108a4.026 4.026 0 001.116-.414c.252-.144.474-.204.666-.18a.63.63 0 01.45.198c.12.12.192.27.216.45a.843.843 0 01-.108.522c-.084.18-.234.336-.45.468-.42.264-.906.462-1.458.594-.54.12-1.044.18-1.512.18zm6.57-.036c-.372 0-.66-.096-.864-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.134h-.18c.168-.72.498-1.266.99-1.638.492-.372 1.146-.594 1.962-.666.252-.024.45.042.594.198.156.144.246.372.27.684.024.3-.048.546-.216.738-.156.18-.396.288-.72.324l-.396.036c-.732.072-1.284.3-1.656.684-.372.372-.558.9-.558 1.584v3.726c0 .372-.096.66-.288.864-.192.192-.474.288-.846.288zm9.031.036a8.901 8.901 0 01-1.638-.162 4.847 4.847 0 01-1.548-.558 1.137 1.137 0 01-.414-.414 1.026 1.026 0 01-.09-.486.875.875 0 01.18-.432.747.747 0 01.396-.234.812.812 0 01.54.09c.48.228.93.39 1.35.486.42.084.834.126 1.242.126.576 0 1.002-.096 1.278-.288.288-.204.432-.468.432-.792 0-.276-.096-.486-.288-.63-.18-.156-.456-.27-.828-.342l-1.8-.342c-.744-.144-1.314-.414-1.71-.81-.384-.408-.576-.93-.576-1.566 0-.576.156-1.074.468-1.494.324-.42.768-.744 1.332-.972.564-.228 1.212-.342 1.944-.342.528 0 1.02.06 1.476.18.468.108.918.282 1.35.522.18.096.3.222.36.378.072.156.09.318.054.486-.036.156-.108.3-.216.432a.753.753 0 01-.414.234c-.156.024-.336-.012-.54-.108a4.844 4.844 0 00-1.08-.414 4.004 4.004 0 00-.972-.126c-.588 0-1.026.102-1.314.306a.96.96 0 00-.414.81c0 .252.084.462.252.63.168.168.426.282.774.342l1.8.342c.78.144 1.368.408 1.764.792.408.384.612.9.612 1.548 0 .876-.342 1.566-1.026 2.07-.684.492-1.596.738-2.736.738zm13.676 0a8.901 8.901 0 01-1.638-.162 4.847 4.847 0 01-1.548-.558 1.137 1.137 0 01-.414-.414 1.026 1.026 0 01-.09-.486.875.875 0 01.18-.432.747.747 0 01.396-.234.812.812 0 01.54.09c.48.228.93.39 1.35.486.42.084.834.126 1.242.126.576 0 1.002-.096 1.278-.288.288-.204.432-.468.432-.792 0-.276-.096-.486-.288-.63-.18-.156-.456-.27-.828-.342l-1.8-.342c-.744-.144-1.314-.414-1.71-.81-.384-.408-.576-.93-.576-1.566 0-.576.156-1.074.468-1.494.324-.42.768-.744 1.332-.972.564-.228 1.212-.342 1.944-.342.528 0 1.02.06 1.476.18.468.108.918.282 1.35.522.18.096.3.222.36.378.072.156.09.318.054.486-.036.156-.108.3-.216.432a.753.753 0 01-.414.234c-.156.024-.336-.012-.54-.108a4.844 4.844 0 00-1.08-.414 4.004 4.004 0 00-.972-.126c-.588 0-1.026.102-1.314.306a.96.96 0 00-.414.81c0 .252.084.462.252.63.168.168.426.282.774.342l1.8.342c.78.144 1.368.408 1.764.792.408.384.612.9.612 1.548 0 .876-.342 1.566-1.026 2.07-.684.492-1.596.738-2.736.738zm6.683-.036c-.36 0-.636-.096-.828-.288-.192-.204-.288-.492-.288-.864V40.3c0-.372.096-.654.288-.846.192-.192.468-.288.828-.288.36 0 .636.096.828.288.204.192.306.474.306.846v4.662h-.252c.264-.636.672-1.116 1.224-1.44.564-.336 1.2-.504 1.908-.504s1.29.132 1.746.396c.456.264.798.666 1.026 1.206.228.528.342 1.2.342 2.016v4.356c0 .372-.096.66-.288.864-.192.192-.468.288-.828.288-.36 0-.642-.096-.846-.288-.192-.204-.288-.492-.288-.864v-4.248c0-.684-.132-1.182-.396-1.494-.252-.312-.648-.468-1.188-.468-.66 0-1.188.21-1.584.63-.384.408-.576.954-.576 1.638v3.942c0 .768-.378 1.152-1.134 1.152zm13.427.036c-.912 0-1.704-.186-2.376-.558a3.903 3.903 0 01-1.566-1.584c-.372-.696-.558-1.512-.558-2.448 0-.708.102-1.338.306-1.89a4.06 4.06 0 01.918-1.44c.396-.408.87-.714 1.422-.918.552-.216 1.17-.324 1.854-.324.912 0 1.704.186 2.376.558.672.372 1.194.9 1.566 1.584.372.684.558 1.494.558 2.43 0 .708-.108 1.344-.324 1.908a4.034 4.034 0 01-.9 1.458c-.396.396-.87.702-1.422.918-.552.204-1.17.306-1.854.306zm0-1.71c.444 0 .834-.108 1.17-.324.336-.216.594-.534.774-.954.192-.432.288-.966.288-1.602 0-.96-.204-1.674-.612-2.142-.408-.48-.948-.72-1.62-.72-.444 0-.834.108-1.17.324-.336.204-.6.522-.792.954-.18.42-.27.948-.27 1.584 0 .948.204 1.668.612 2.16.408.48.948.72 1.62.72zm9.584 1.674c-.3 0-.558-.072-.774-.216-.216-.156-.39-.396-.522-.72l-2.61-6.66c-.108-.288-.144-.54-.108-.756a.867.867 0 01.342-.54c.18-.132.42-.198.72-.198.264 0 .48.066.648.198.168.12.312.354.432.702l2.178 5.994h-.414l2.25-6.138c.096-.264.222-.456.378-.576.168-.12.384-.18.648-.18s.48.066.648.198c.168.12.294.306.378.558l2.214 6.138h-.378l2.196-6.048c.12-.324.27-.546.45-.666.192-.12.402-.18.63-.18.288 0 .51.072.666.216.156.144.246.33.27.558.024.216-.018.456-.126.72l-2.592 6.66c-.12.312-.294.546-.522.702a1.286 1.286 0 01-.774.234c-.3 0-.564-.078-.792-.234-.216-.156-.384-.39-.504-.702l-2.358-6.246h1.026l-2.304 6.228c-.12.324-.288.564-.504.72-.216.156-.48.234-.792.234zm13.059 0c-.36 0-.636-.096-.828-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.224l-.198-.45c.264-.636.672-1.116 1.224-1.44.564-.336 1.2-.504 1.908-.504s1.29.132 1.746.396c.456.264.798.666 1.026 1.206.228.528.342 1.2.342 2.016v4.356c0 .372-.096.66-.288.864-.192.192-.468.288-.828.288-.36 0-.642-.096-.846-.288-.192-.204-.288-.492-.288-.864v-4.248c0-.684-.132-1.182-.396-1.494-.252-.312-.648-.468-1.188-.468-.66 0-1.188.21-1.584.63-.384.408-.576.954-.576 1.638v3.942c0 .768-.378 1.152-1.134 1.152zm10.494-.054c-.408 0-.738-.126-.99-.378-.24-.252-.36-.576-.36-.972 0-.384.12-.696.36-.936.252-.252.582-.378.99-.378.42 0 .744.126.972.378.24.24.36.552.36.936 0 .396-.12.72-.36.972-.228.252-.552.378-.972.378zm14.391.09c-1.32 0-2.454-.264-3.402-.792a5.468 5.468 0 01-2.16-2.268c-.504-.984-.756-2.142-.756-3.474 0-.996.144-1.89.432-2.682a5.704 5.704 0 011.242-2.052 5.257 5.257 0 011.98-1.314c.792-.312 1.68-.468 2.664-.468.66 0 1.308.084 1.944.252a5.737 5.737 0 011.674.72c.252.156.42.348.504.576.084.216.102.432.054.648-.048.204-.15.378-.306.522a.894.894 0 01-.558.252c-.216.012-.456-.066-.72-.234a3.998 3.998 0 00-1.206-.522 5.398 5.398 0 00-1.314-.162c-.852 0-1.572.174-2.16.522-.588.348-1.032.852-1.332 1.512-.3.66-.45 1.47-.45 2.43 0 .948.15 1.758.45 2.43.3.672.744 1.182 1.332 1.53.588.348 1.308.522 2.16.522.456 0 .906-.054 1.35-.162.444-.12.864-.3 1.26-.54.264-.156.498-.222.702-.198a.841.841 0 01.54.216c.144.132.24.3.288.504.048.192.036.396-.036.612-.072.204-.216.384-.432.54-.48.348-1.056.618-1.728.81-.66.18-1.332.27-2.016.27zm7.267-.036c-.372 0-.66-.096-.864-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.134h-.18c.168-.72.498-1.266.99-1.638.492-.372 1.146-.594 1.962-.666.252-.024.45.042.594.198.156.144.246.372.27.684.024.3-.048.546-.216.738-.156.18-.396.288-.72.324l-.396.036c-.732.072-1.284.3-1.656.684-.372.372-.558.9-.558 1.584v3.726c0 .372-.096.66-.288.864-.192.192-.474.288-.846.288zm10.094.036c-.996 0-1.854-.186-2.574-.558a4.024 4.024 0 01-1.674-1.584c-.384-.684-.576-1.494-.576-2.43 0-.912.186-1.71.558-2.394a4.186 4.186 0 011.566-1.602c.672-.396 1.434-.594 2.286-.594.624 0 1.182.102 1.674.306.504.204.93.498 1.278.882.36.384.63.852.81 1.404.192.54.288 1.152.288 1.836a.6.6 0 01-.234.504c-.144.108-.354.162-.63.162h-5.778v-1.296h5.058l-.288.27c0-.552-.084-1.014-.252-1.386a1.757 1.757 0 00-.702-.846c-.3-.204-.678-.306-1.134-.306-.504 0-.936.12-1.296.36-.348.228-.618.558-.81.99-.18.42-.27.924-.27 1.512v.126c0 .984.228 1.722.684 2.214.468.48 1.152.72 2.052.72.312 0 .66-.036 1.044-.108a4.026 4.026 0 001.116-.414c.252-.144.474-.204.666-.18a.63.63 0 01.45.198c.12.12.192.27.216.45a.843.843 0 01-.108.522c-.084.18-.234.336-.45.468-.42.264-.906.462-1.458.594-.54.12-1.044.18-1.512.18zm8.316 0c-.636 0-1.206-.12-1.71-.36a3.1 3.1 0 01-1.17-1.008 2.532 2.532 0 01-.414-1.422c0-.648.168-1.158.504-1.53.336-.384.882-.66 1.638-.828.756-.168 1.77-.252 3.042-.252h.9v1.296h-.882c-.744 0-1.338.036-1.782.108-.444.072-.762.198-.954.378-.18.168-.27.408-.27.72 0 .396.138.72.414.972.276.252.66.378 1.152.378.396 0 .744-.09 1.044-.27.312-.192.558-.45.738-.774.18-.324.27-.696.27-1.116v-2.07c0-.6-.132-1.032-.396-1.296s-.708-.396-1.332-.396c-.348 0-.726.042-1.134.126a6.043 6.043 0 00-1.26.432c-.228.108-.432.138-.612.09a.689.689 0 01-.396-.288.945.945 0 01-.144-.504c0-.18.048-.354.144-.522.096-.18.258-.312.486-.396a8.171 8.171 0 011.584-.486 7.74 7.74 0 011.404-.144c.864 0 1.572.132 2.124.396.564.264.984.666 1.26 1.206.276.528.414 1.212.414 2.052v4.32c0 .372-.09.66-.27.864-.18.192-.438.288-.774.288s-.6-.096-.792-.288c-.18-.204-.27-.492-.27-.864v-.864h.144a2.44 2.44 0 01-1.422 1.8 3.075 3.075 0 01-1.278.252zm10.977 0c-.78 0-1.434-.132-1.962-.396a2.55 2.55 0 01-1.152-1.152c-.252-.516-.378-1.152-.378-1.908V44.89h-.936c-.288 0-.51-.072-.666-.216-.156-.156-.234-.366-.234-.63 0-.276.078-.486.234-.63.156-.144.378-.216.666-.216h.936V41.56c0-.372.096-.654.288-.846.204-.192.486-.288.846-.288s.636.096.828.288c.192.192.288.474.288.846v1.638h1.908c.288 0 .51.072.666.216.156.144.234.354.234.63 0 .264-.078.474-.234.63-.156.144-.378.216-.666.216h-1.908v3.708c0 .576.126 1.008.378 1.296.252.288.66.432 1.224.432.204 0 .384-.018.54-.054.156-.036.294-.06.414-.072a.412.412 0 01.36.144c.096.096.144.3.144.612a1.6 1.6 0 01-.126.648.652.652 0 01-.414.378c-.156.048-.36.09-.612.126a3.613 3.613 0 01-.666.072zm7.127 0c-.996 0-1.854-.186-2.574-.558a4.024 4.024 0 01-1.674-1.584c-.384-.684-.576-1.494-.576-2.43 0-.912.186-1.71.558-2.394a4.186 4.186 0 011.566-1.602c.672-.396 1.434-.594 2.286-.594.624 0 1.182.102 1.674.306.504.204.93.498 1.278.882.36.384.63.852.81 1.404.192.54.288 1.152.288 1.836a.6.6 0 01-.234.504c-.144.108-.354.162-.63.162h-5.778v-1.296h5.058l-.288.27c0-.552-.084-1.014-.252-1.386a1.757 1.757 0 00-.702-.846c-.3-.204-.678-.306-1.134-.306-.504 0-.936.12-1.296.36-.348.228-.618.558-.81.99-.18.42-.27.924-.27 1.512v.126c0 .984.228 1.722.684 2.214.468.48 1.152.72 2.052.72.312 0 .66-.036 1.044-.108a4.026 4.026 0 001.116-.414c.252-.144.474-.204.666-.18a.63.63 0 01.45.198c.12.12.192.27.216.45a.843.843 0 01-.108.522c-.084.18-.234.336-.45.468-.42.264-.906.462-1.458.594-.54.12-1.044.18-1.512.18zm12.536 3.204c-.264 0-.48-.072-.648-.216a.822.822 0 01-.306-.54 1.435 1.435 0 01.126-.72l1.224-2.718v.936l-3.276-7.578c-.108-.264-.144-.51-.108-.738a.797.797 0 01.324-.54c.192-.144.45-.216.774-.216.276 0 .498.066.666.198.168.12.318.354.45.702l2.43 6.066h-.54l2.484-6.084c.132-.336.288-.564.468-.684.18-.132.42-.198.72-.198.264 0 .474.072.63.216a.854.854 0 01.288.54c.036.216-.006.456-.126.72l-4.374 9.99c-.156.336-.324.564-.504.684-.18.12-.414.18-.702.18zm11.081-3.204c-.912 0-1.704-.186-2.376-.558a3.903 3.903 0 01-1.566-1.584c-.372-.696-.558-1.512-.558-2.448 0-.708.102-1.338.306-1.89a4.06 4.06 0 01.918-1.44c.396-.408.87-.714 1.422-.918.552-.216 1.17-.324 1.854-.324.912 0 1.704.186 2.376.558.672.372 1.194.9 1.566 1.584.372.684.558 1.494.558 2.43 0 .708-.108 1.344-.324 1.908a4.034 4.034 0 01-.9 1.458c-.396.396-.87.702-1.422.918-.552.204-1.17.306-1.854.306zm0-1.71c.444 0 .834-.108 1.17-.324.336-.216.594-.534.774-.954.192-.432.288-.966.288-1.602 0-.96-.204-1.674-.612-2.142-.408-.48-.948-.72-1.62-.72-.444 0-.834.108-1.17.324-.336.204-.6.522-.792.954-.18.42-.27.948-.27 1.584 0 .948.204 1.668.612 2.16.408.48.948.72 1.62.72zm9.543 1.71c-.732 0-1.338-.132-1.818-.396a2.57 2.57 0 01-1.08-1.224c-.228-.54-.342-1.212-.342-2.016v-4.356c0-.384.096-.666.288-.846.192-.192.468-.288.828-.288.36 0 .636.096.828.288.204.18.306.462.306.846v4.392c0 .624.126 1.086.378 1.386.252.3.654.45 1.206.45.6 0 1.092-.204 1.476-.612.384-.42.576-.972.576-1.656v-3.96c0-.384.096-.666.288-.846.192-.192.468-.288.828-.288.36 0 .636.096.828.288.204.18.306.462.306.846v6.804c0 .768-.366 1.152-1.098 1.152-.348 0-.618-.096-.81-.288-.192-.204-.288-.492-.288-.864v-1.368l.252.54c-.252.648-.636 1.146-1.152 1.494-.504.348-1.104.522-1.8.522zm8.39-.036c-.372 0-.66-.096-.864-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.134h-.18c.168-.72.498-1.266.99-1.638.492-.372 1.146-.594 1.962-.666.252-.024.45.042.594.198.156.144.246.372.27.684.024.3-.048.546-.216.738-.156.18-.396.288-.72.324l-.396.036c-.732.072-1.284.3-1.656.684-.372.372-.558.9-.558 1.584v3.726c0 .372-.096.66-.288.864-.192.192-.474.288-.846.288zm14.798.036c-.912 0-1.704-.186-2.376-.558a3.903 3.903 0 01-1.566-1.584c-.372-.696-.558-1.512-.558-2.448 0-.708.102-1.338.306-1.89a4.06 4.06 0 01.918-1.44c.396-.408.87-.714 1.422-.918.552-.216 1.17-.324 1.854-.324.912 0 1.704.186 2.376.558.672.372 1.194.9 1.566 1.584.372.684.558 1.494.558 2.43 0 .708-.108 1.344-.324 1.908a4.034 4.034 0 01-.9 1.458c-.396.396-.87.702-1.422.918-.552.204-1.17.306-1.854.306zm0-1.71c.444 0 .834-.108 1.17-.324.336-.216.594-.534.774-.954.192-.432.288-.966.288-1.602 0-.96-.204-1.674-.612-2.142-.408-.48-.948-.72-1.62-.72-.444 0-.834.108-1.17.324-.336.204-.6.522-.792.954-.18.42-.27.948-.27 1.584 0 .948.204 1.668.612 2.16.408.48.948.72 1.62.72zm9.583 1.674c-.3 0-.558-.072-.774-.216-.216-.156-.39-.396-.522-.72l-2.61-6.66c-.108-.288-.144-.54-.108-.756a.867.867 0 01.342-.54c.18-.132.42-.198.72-.198.264 0 .48.066.648.198.168.12.312.354.432.702l2.178 5.994h-.414l2.25-6.138c.096-.264.222-.456.378-.576.168-.12.384-.18.648-.18s.48.066.648.198c.168.12.294.306.378.558l2.214 6.138h-.378l2.196-6.048c.12-.324.27-.546.45-.666.192-.12.402-.18.63-.18.288 0 .51.072.666.216.156.144.246.33.27.558.024.216-.018.456-.126.72l-2.592 6.66c-.12.312-.294.546-.522.702a1.286 1.286 0 01-.774.234c-.3 0-.564-.078-.792-.234-.216-.156-.384-.39-.504-.702l-2.358-6.246h1.026l-2.304 6.228c-.12.324-.288.564-.504.72-.216.156-.48.234-.792.234zm13.06 0c-.36 0-.636-.096-.828-.288-.192-.204-.288-.492-.288-.864v-6.804c0-.372.096-.654.288-.846.192-.192.462-.288.81-.288.348 0 .618.096.81.288.192.192.288.474.288.846v1.224l-.198-.45c.264-.636.672-1.116 1.224-1.44.564-.336 1.2-.504 1.908-.504s1.29.132 1.746.396c.456.264.798.666 1.026 1.206.228.528.342 1.2.342 2.016v4.356c0 .372-.096.66-.288.864-.192.192-.468.288-.828.288-.36 0-.642-.096-.846-.288-.192-.204-.288-.492-.288-.864v-4.248c0-.684-.132-1.182-.396-1.494-.252-.312-.648-.468-1.188-.468-.66 0-1.188.21-1.584.63-.384.408-.576.954-.576 1.638v3.942c0 .768-.378 1.152-1.134 1.152zm10.493-3.798c-.228 0-.408-.072-.54-.216-.12-.144-.192-.348-.216-.612l-.54-6.876c-.036-.444.06-.798.288-1.062.228-.276.564-.414 1.008-.414.432 0 .756.138.972.414.228.264.324.618.288 1.062l-.54 6.876c-.012.264-.084.468-.216.612-.12.144-.288.216-.504.216zm0 3.744c-.408 0-.738-.126-.99-.378-.24-.252-.36-.576-.36-.972 0-.384.12-.696.36-.936.252-.252.582-.378.99-.378.42 0 .744.126.972.378.24.24.36.552.36.936 0 .396-.12.72-.36.972-.228.252-.552.378-.972.378z"
      fill="#181A20"
    />
  </Svg>
);

export default HomeEmptyReviewerBanner;
