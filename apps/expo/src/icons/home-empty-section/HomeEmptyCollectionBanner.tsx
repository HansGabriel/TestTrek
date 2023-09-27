import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";
import { FC } from "react";
const HomeEmptyCollectionBanner: FC<SvgProps> = (props) => (
  <Svg width={351} height={128} viewBox="0 0 371 128" fill="none" {...props}>
    <Rect width={371} height={128} rx={8} fill="#6949FF" fillOpacity={0.1} />
    <Path
      d="M23.466 52.144C23.118 52.144 22.848 52.048 22.656 51.856C22.476 51.664 22.386 51.388 22.386 51.028V40.318C22.386 39.946 22.476 39.664 22.656 39.472C22.848 39.268 23.094 39.166 23.394 39.166C23.67 39.166 23.874 39.22 24.006 39.328C24.15 39.424 24.318 39.592 24.51 39.832L31.404 48.778H30.936V40.264C30.936 39.916 31.026 39.646 31.206 39.454C31.398 39.262 31.668 39.166 32.016 39.166C32.364 39.166 32.628 39.262 32.808 39.454C32.988 39.646 33.078 39.916 33.078 40.264V51.064C33.078 51.4 32.994 51.664 32.826 51.856C32.658 52.048 32.43 52.144 32.142 52.144C31.866 52.144 31.644 52.09 31.476 51.982C31.32 51.874 31.146 51.7 30.954 51.46L24.078 42.514H24.528V51.028C24.528 51.388 24.438 51.664 24.258 51.856C24.078 52.048 23.814 52.144 23.466 52.144ZM39.6488 52.18C38.7368 52.18 37.9448 51.994 37.2728 51.622C36.6008 51.25 36.0788 50.722 35.7068 50.038C35.3348 49.342 35.1488 48.526 35.1488 47.59C35.1488 46.882 35.2508 46.252 35.4548 45.7C35.6708 45.136 35.9768 44.656 36.3728 44.26C36.7688 43.852 37.2428 43.546 37.7948 43.342C38.3468 43.126 38.9648 43.018 39.6488 43.018C40.5608 43.018 41.3528 43.204 42.0248 43.576C42.6968 43.948 43.2188 44.476 43.5908 45.16C43.9628 45.844 44.1488 46.654 44.1488 47.59C44.1488 48.298 44.0408 48.934 43.8248 49.498C43.6208 50.062 43.3208 50.548 42.9248 50.956C42.5288 51.352 42.0548 51.658 41.5028 51.874C40.9508 52.078 40.3328 52.18 39.6488 52.18ZM39.6488 50.47C40.0928 50.47 40.4828 50.362 40.8188 50.146C41.1548 49.93 41.4128 49.612 41.5928 49.192C41.7848 48.76 41.8808 48.226 41.8808 47.59C41.8808 46.63 41.6768 45.916 41.2688 45.448C40.8608 44.968 40.3208 44.728 39.6488 44.728C39.2048 44.728 38.8148 44.836 38.4788 45.052C38.1428 45.256 37.8788 45.574 37.6868 46.006C37.5068 46.426 37.4168 46.954 37.4168 47.59C37.4168 48.538 37.6208 49.258 38.0288 49.75C38.4368 50.23 38.9768 50.47 39.6488 50.47ZM54.9607 52.18C54.0367 52.18 53.2327 51.994 52.5487 51.622C51.8647 51.238 51.3367 50.698 50.9647 50.002C50.5927 49.306 50.4067 48.49 50.4067 47.554C50.4067 46.846 50.5087 46.216 50.7127 45.664C50.9287 45.1 51.2347 44.626 51.6307 44.242C52.0267 43.846 52.5067 43.546 53.0707 43.342C53.6347 43.126 54.2647 43.018 54.9607 43.018C55.3567 43.018 55.7827 43.072 56.2387 43.18C56.7067 43.288 57.1447 43.468 57.5527 43.72C57.7447 43.84 57.8707 43.984 57.9307 44.152C57.9907 44.32 58.0027 44.494 57.9667 44.674C57.9307 44.842 57.8527 44.992 57.7327 45.124C57.6247 45.244 57.4867 45.322 57.3187 45.358C57.1507 45.382 56.9647 45.34 56.7607 45.232C56.4967 45.076 56.2267 44.962 55.9507 44.89C55.6747 44.806 55.4107 44.764 55.1587 44.764C54.7627 44.764 54.4147 44.83 54.1147 44.962C53.8147 45.082 53.5567 45.262 53.3407 45.502C53.1367 45.73 52.9807 46.018 52.8727 46.366C52.7647 46.714 52.7107 47.116 52.7107 47.572C52.7107 48.46 52.9207 49.162 53.3407 49.678C53.7727 50.182 54.3787 50.434 55.1587 50.434C55.4107 50.434 55.6687 50.398 55.9327 50.326C56.2087 50.254 56.4847 50.14 56.7607 49.984C56.9647 49.876 57.1447 49.84 57.3007 49.876C57.4687 49.912 57.6067 49.996 57.7147 50.128C57.8227 50.248 57.8887 50.398 57.9127 50.578C57.9367 50.746 57.9127 50.914 57.8407 51.082C57.7807 51.25 57.6607 51.388 57.4807 51.496C57.0847 51.736 56.6647 51.91 56.2207 52.018C55.7767 52.126 55.3567 52.18 54.9607 52.18ZM63.2211 52.18C62.3091 52.18 61.5171 51.994 60.8451 51.622C60.1731 51.25 59.6511 50.722 59.2791 50.038C58.9071 49.342 58.7211 48.526 58.7211 47.59C58.7211 46.882 58.8231 46.252 59.0271 45.7C59.2431 45.136 59.5491 44.656 59.9451 44.26C60.3411 43.852 60.8151 43.546 61.3671 43.342C61.9191 43.126 62.5371 43.018 63.2211 43.018C64.1331 43.018 64.9251 43.204 65.5971 43.576C66.2691 43.948 66.7911 44.476 67.1631 45.16C67.5351 45.844 67.7211 46.654 67.7211 47.59C67.7211 48.298 67.6131 48.934 67.3971 49.498C67.1931 50.062 66.8931 50.548 66.4971 50.956C66.1011 51.352 65.6271 51.658 65.0751 51.874C64.5231 52.078 63.9051 52.18 63.2211 52.18ZM63.2211 50.47C63.6651 50.47 64.0551 50.362 64.3911 50.146C64.7271 49.93 64.9851 49.612 65.1651 49.192C65.3571 48.76 65.4531 48.226 65.4531 47.59C65.4531 46.63 65.2491 45.916 64.8411 45.448C64.4331 44.968 63.8931 44.728 63.2211 44.728C62.7771 44.728 62.3871 44.836 62.0511 45.052C61.7151 45.256 61.4511 45.574 61.2591 46.006C61.0791 46.426 60.9891 46.954 60.9891 47.59C60.9891 48.538 61.1931 49.258 61.6011 49.75C62.0091 50.23 62.5491 50.47 63.2211 50.47ZM72.5842 52.18C71.5882 52.18 70.8382 51.898 70.3342 51.334C69.8302 50.758 69.5782 49.918 69.5782 48.814V40.3C69.5782 39.928 69.6742 39.646 69.8662 39.454C70.0582 39.262 70.3342 39.166 70.6942 39.166C71.0542 39.166 71.3302 39.262 71.5222 39.454C71.7262 39.646 71.8282 39.928 71.8282 40.3V48.706C71.8282 49.258 71.9422 49.666 72.1702 49.93C72.4102 50.194 72.7462 50.326 73.1782 50.326C73.2742 50.326 73.3642 50.326 73.4482 50.326C73.5322 50.314 73.6162 50.302 73.7002 50.29C73.8682 50.266 73.9822 50.314 74.0422 50.434C74.1022 50.542 74.1322 50.77 74.1322 51.118C74.1322 51.418 74.0722 51.652 73.9522 51.82C73.8322 51.988 73.6342 52.09 73.3582 52.126C73.2382 52.138 73.1122 52.15 72.9802 52.162C72.8482 52.174 72.7162 52.18 72.5842 52.18ZM78.3323 52.18C77.3363 52.18 76.5863 51.898 76.0823 51.334C75.5783 50.758 75.3263 49.918 75.3263 48.814V40.3C75.3263 39.928 75.4223 39.646 75.6143 39.454C75.8063 39.262 76.0823 39.166 76.4423 39.166C76.8023 39.166 77.0783 39.262 77.2703 39.454C77.4743 39.646 77.5763 39.928 77.5763 40.3V48.706C77.5763 49.258 77.6903 49.666 77.9183 49.93C78.1583 50.194 78.4943 50.326 78.9263 50.326C79.0223 50.326 79.1123 50.326 79.1963 50.326C79.2803 50.314 79.3643 50.302 79.4482 50.29C79.6163 50.266 79.7303 50.314 79.7903 50.434C79.8503 50.542 79.8803 50.77 79.8803 51.118C79.8803 51.418 79.8203 51.652 79.7003 51.82C79.5803 51.988 79.3823 52.09 79.1063 52.126C78.9863 52.138 78.8603 52.15 78.7283 52.162C78.5963 52.174 78.4643 52.18 78.3323 52.18ZM85.3244 52.18C84.3284 52.18 83.4704 51.994 82.7504 51.622C82.0304 51.25 81.4724 50.722 81.0764 50.038C80.6924 49.354 80.5004 48.544 80.5004 47.608C80.5004 46.696 80.6864 45.898 81.0584 45.214C81.4424 44.53 81.9644 43.996 82.6244 43.612C83.2964 43.216 84.0584 43.018 84.9104 43.018C85.5344 43.018 86.0924 43.12 86.5844 43.324C87.0884 43.528 87.5144 43.822 87.8624 44.206C88.2224 44.59 88.4924 45.058 88.6724 45.61C88.8644 46.15 88.9604 46.762 88.9604 47.446C88.9604 47.662 88.8824 47.83 88.7264 47.95C88.5824 48.058 88.3724 48.112 88.0964 48.112H82.3184V46.816H87.3764L87.0884 47.086C87.0884 46.534 87.0044 46.072 86.8364 45.7C86.6804 45.328 86.4464 45.046 86.1344 44.854C85.8344 44.65 85.4564 44.548 85.0004 44.548C84.4964 44.548 84.0644 44.668 83.7044 44.908C83.3564 45.136 83.0864 45.466 82.8944 45.898C82.7144 46.318 82.6244 46.822 82.6244 47.41V47.536C82.6244 48.52 82.8524 49.258 83.3084 49.75C83.7764 50.23 84.4604 50.47 85.3604 50.47C85.6724 50.47 86.0204 50.434 86.4044 50.362C86.8004 50.278 87.1724 50.14 87.5204 49.948C87.7724 49.804 87.9944 49.744 88.1864 49.768C88.3784 49.78 88.5284 49.846 88.6364 49.966C88.7564 50.086 88.8284 50.236 88.8524 50.416C88.8764 50.584 88.8404 50.758 88.7444 50.938C88.6604 51.118 88.5104 51.274 88.2944 51.406C87.8744 51.67 87.3884 51.868 86.8364 52C86.2964 52.12 85.7924 52.18 85.3244 52.18ZM94.8103 52.18C93.8863 52.18 93.0823 51.994 92.3983 51.622C91.7143 51.238 91.1863 50.698 90.8143 50.002C90.4423 49.306 90.2563 48.49 90.2563 47.554C90.2563 46.846 90.3583 46.216 90.5623 45.664C90.7783 45.1 91.0843 44.626 91.4803 44.242C91.8763 43.846 92.3563 43.546 92.9203 43.342C93.4843 43.126 94.1143 43.018 94.8103 43.018C95.2063 43.018 95.6323 43.072 96.0883 43.18C96.5563 43.288 96.9943 43.468 97.4023 43.72C97.5943 43.84 97.7203 43.984 97.7803 44.152C97.8403 44.32 97.8523 44.494 97.8163 44.674C97.7803 44.842 97.7023 44.992 97.5823 45.124C97.4743 45.244 97.3363 45.322 97.1683 45.358C97.0003 45.382 96.8143 45.34 96.6103 45.232C96.3463 45.076 96.0763 44.962 95.8003 44.89C95.5243 44.806 95.2603 44.764 95.0083 44.764C94.6123 44.764 94.2643 44.83 93.9643 44.962C93.6643 45.082 93.4063 45.262 93.1903 45.502C92.9863 45.73 92.8303 46.018 92.7223 46.366C92.6143 46.714 92.5603 47.116 92.5603 47.572C92.5603 48.46 92.7703 49.162 93.1903 49.678C93.6223 50.182 94.2283 50.434 95.0083 50.434C95.2603 50.434 95.5183 50.398 95.7823 50.326C96.0583 50.254 96.3343 50.14 96.6103 49.984C96.8143 49.876 96.9943 49.84 97.1503 49.876C97.3183 49.912 97.4563 49.996 97.5643 50.128C97.6723 50.248 97.7383 50.398 97.7623 50.578C97.7863 50.746 97.7623 50.914 97.6903 51.082C97.6303 51.25 97.5103 51.388 97.3303 51.496C96.9343 51.736 96.5143 51.91 96.0703 52.018C95.6263 52.126 95.2063 52.18 94.8103 52.18ZM103.3 52.18C102.52 52.18 101.866 52.048 101.338 51.784C100.822 51.52 100.438 51.136 100.186 50.632C99.9337 50.116 99.8077 49.48 99.8077 48.724V44.89H98.8717C98.5837 44.89 98.3617 44.818 98.2057 44.674C98.0497 44.518 97.9717 44.308 97.9717 44.044C97.9717 43.768 98.0497 43.558 98.2057 43.414C98.3617 43.27 98.5837 43.198 98.8717 43.198H99.8077V41.56C99.8077 41.188 99.9037 40.906 100.096 40.714C100.3 40.522 100.582 40.426 100.942 40.426C101.302 40.426 101.578 40.522 101.77 40.714C101.962 40.906 102.058 41.188 102.058 41.56V43.198H103.966C104.254 43.198 104.476 43.27 104.632 43.414C104.788 43.558 104.866 43.768 104.866 44.044C104.866 44.308 104.788 44.518 104.632 44.674C104.476 44.818 104.254 44.89 103.966 44.89H102.058V48.598C102.058 49.174 102.184 49.606 102.436 49.894C102.688 50.182 103.096 50.326 103.66 50.326C103.864 50.326 104.044 50.308 104.2 50.272C104.356 50.236 104.494 50.212 104.614 50.2C104.758 50.188 104.878 50.236 104.974 50.344C105.07 50.44 105.118 50.644 105.118 50.956C105.118 51.196 105.076 51.412 104.992 51.604C104.92 51.784 104.782 51.91 104.578 51.982C104.422 52.03 104.218 52.072 103.966 52.108C103.714 52.156 103.492 52.18 103.3 52.18ZM107.52 52.126C107.16 52.126 106.884 52.018 106.692 51.802C106.5 51.586 106.404 51.286 106.404 50.902V44.296C106.404 43.9 106.5 43.6 106.692 43.396C106.884 43.18 107.16 43.072 107.52 43.072C107.88 43.072 108.156 43.18 108.348 43.396C108.552 43.6 108.654 43.9 108.654 44.296V50.902C108.654 51.286 108.558 51.586 108.366 51.802C108.174 52.018 107.892 52.126 107.52 52.126ZM107.52 41.398C107.1 41.398 106.77 41.296 106.53 41.092C106.302 40.876 106.188 40.582 106.188 40.21C106.188 39.826 106.302 39.532 106.53 39.328C106.77 39.124 107.1 39.022 107.52 39.022C107.952 39.022 108.282 39.124 108.51 39.328C108.738 39.532 108.852 39.826 108.852 40.21C108.852 40.582 108.738 40.876 108.51 41.092C108.282 41.296 107.952 41.398 107.52 41.398ZM115.006 52.18C114.094 52.18 113.302 51.994 112.63 51.622C111.958 51.25 111.436 50.722 111.064 50.038C110.692 49.342 110.506 48.526 110.506 47.59C110.506 46.882 110.608 46.252 110.812 45.7C111.028 45.136 111.334 44.656 111.73 44.26C112.126 43.852 112.6 43.546 113.152 43.342C113.704 43.126 114.322 43.018 115.006 43.018C115.918 43.018 116.71 43.204 117.382 43.576C118.054 43.948 118.576 44.476 118.948 45.16C119.32 45.844 119.506 46.654 119.506 47.59C119.506 48.298 119.398 48.934 119.182 49.498C118.978 50.062 118.678 50.548 118.282 50.956C117.886 51.352 117.412 51.658 116.86 51.874C116.308 52.078 115.69 52.18 115.006 52.18ZM115.006 50.47C115.45 50.47 115.84 50.362 116.176 50.146C116.512 49.93 116.77 49.612 116.95 49.192C117.142 48.76 117.238 48.226 117.238 47.59C117.238 46.63 117.034 45.916 116.626 45.448C116.218 44.968 115.678 44.728 115.006 44.728C114.562 44.728 114.172 44.836 113.836 45.052C113.5 45.256 113.236 45.574 113.044 46.006C112.864 46.426 112.774 46.954 112.774 47.59C112.774 48.538 112.978 49.258 113.386 49.75C113.794 50.23 114.334 50.47 115.006 50.47ZM122.479 52.144C122.119 52.144 121.843 52.048 121.651 51.856C121.459 51.652 121.363 51.364 121.363 50.992V44.188C121.363 43.816 121.459 43.534 121.651 43.342C121.843 43.15 122.113 43.054 122.461 43.054C122.809 43.054 123.079 43.15 123.271 43.342C123.463 43.534 123.559 43.816 123.559 44.188V45.412L123.361 44.962C123.625 44.326 124.033 43.846 124.585 43.522C125.149 43.186 125.785 43.018 126.493 43.018C127.201 43.018 127.783 43.15 128.239 43.414C128.695 43.678 129.037 44.08 129.265 44.62C129.493 45.148 129.607 45.82 129.607 46.636V50.992C129.607 51.364 129.511 51.652 129.319 51.856C129.127 52.048 128.851 52.144 128.491 52.144C128.131 52.144 127.849 52.048 127.645 51.856C127.453 51.652 127.357 51.364 127.357 50.992V46.744C127.357 46.06 127.225 45.562 126.961 45.25C126.709 44.938 126.313 44.782 125.773 44.782C125.113 44.782 124.585 44.992 124.189 45.412C123.805 45.82 123.613 46.366 123.613 47.05V50.992C123.613 51.76 123.235 52.144 122.479 52.144ZM135.115 52.18C134.599 52.18 134.053 52.126 133.477 52.018C132.901 51.91 132.385 51.724 131.929 51.46C131.737 51.34 131.599 51.202 131.515 51.046C131.443 50.878 131.413 50.716 131.425 50.56C131.449 50.392 131.509 50.248 131.605 50.128C131.713 50.008 131.845 49.93 132.001 49.894C132.169 49.858 132.349 49.888 132.541 49.984C133.021 50.212 133.471 50.374 133.891 50.47C134.311 50.554 134.725 50.596 135.133 50.596C135.709 50.596 136.135 50.5 136.411 50.308C136.699 50.104 136.843 49.84 136.843 49.516C136.843 49.24 136.747 49.03 136.555 48.886C136.375 48.73 136.099 48.616 135.727 48.544L133.927 48.202C133.183 48.058 132.613 47.788 132.217 47.392C131.833 46.984 131.641 46.462 131.641 45.826C131.641 45.25 131.797 44.752 132.109 44.332C132.433 43.912 132.877 43.588 133.441 43.36C134.005 43.132 134.653 43.018 135.385 43.018C135.913 43.018 136.405 43.078 136.861 43.198C137.329 43.306 137.779 43.48 138.211 43.72C138.391 43.816 138.511 43.942 138.571 44.098C138.643 44.254 138.661 44.416 138.625 44.584C138.589 44.74 138.517 44.884 138.409 45.016C138.301 45.136 138.163 45.214 137.995 45.25C137.839 45.274 137.659 45.238 137.455 45.142C137.083 44.95 136.723 44.812 136.375 44.728C136.039 44.644 135.715 44.602 135.403 44.602C134.815 44.602 134.377 44.704 134.089 44.908C133.813 45.112 133.675 45.382 133.675 45.718C133.675 45.97 133.759 46.18 133.927 46.348C134.095 46.516 134.353 46.63 134.701 46.69L136.501 47.032C137.281 47.176 137.869 47.44 138.265 47.824C138.673 48.208 138.877 48.724 138.877 49.372C138.877 50.248 138.535 50.938 137.851 51.442C137.167 51.934 136.255 52.18 135.115 52.18ZM148.79 52.18C148.274 52.18 147.728 52.126 147.152 52.018C146.576 51.91 146.06 51.724 145.604 51.46C145.412 51.34 145.274 51.202 145.19 51.046C145.118 50.878 145.088 50.716 145.1 50.56C145.124 50.392 145.184 50.248 145.28 50.128C145.388 50.008 145.52 49.93 145.676 49.894C145.844 49.858 146.024 49.888 146.216 49.984C146.696 50.212 147.146 50.374 147.566 50.47C147.986 50.554 148.4 50.596 148.808 50.596C149.384 50.596 149.81 50.5 150.086 50.308C150.374 50.104 150.518 49.84 150.518 49.516C150.518 49.24 150.422 49.03 150.23 48.886C150.05 48.73 149.774 48.616 149.402 48.544L147.602 48.202C146.858 48.058 146.288 47.788 145.892 47.392C145.508 46.984 145.316 46.462 145.316 45.826C145.316 45.25 145.472 44.752 145.784 44.332C146.108 43.912 146.552 43.588 147.116 43.36C147.68 43.132 148.328 43.018 149.06 43.018C149.588 43.018 150.08 43.078 150.536 43.198C151.004 43.306 151.454 43.48 151.886 43.72C152.066 43.816 152.186 43.942 152.246 44.098C152.318 44.254 152.336 44.416 152.3 44.584C152.264 44.74 152.192 44.884 152.084 45.016C151.976 45.136 151.838 45.214 151.67 45.25C151.514 45.274 151.334 45.238 151.13 45.142C150.758 44.95 150.398 44.812 150.05 44.728C149.714 44.644 149.39 44.602 149.078 44.602C148.49 44.602 148.052 44.704 147.764 44.908C147.488 45.112 147.35 45.382 147.35 45.718C147.35 45.97 147.434 46.18 147.602 46.348C147.77 46.516 148.028 46.63 148.376 46.69L150.176 47.032C150.956 47.176 151.544 47.44 151.94 47.824C152.348 48.208 152.552 48.724 152.552 49.372C152.552 50.248 152.21 50.938 151.526 51.442C150.842 51.934 149.93 52.18 148.79 52.18ZM155.474 52.144C155.114 52.144 154.838 52.048 154.646 51.856C154.454 51.652 154.358 51.364 154.358 50.992V40.3C154.358 39.928 154.454 39.646 154.646 39.454C154.838 39.262 155.114 39.166 155.474 39.166C155.834 39.166 156.11 39.262 156.302 39.454C156.506 39.646 156.608 39.928 156.608 40.3V44.962H156.356C156.62 44.326 157.028 43.846 157.58 43.522C158.144 43.186 158.78 43.018 159.488 43.018C160.196 43.018 160.778 43.15 161.234 43.414C161.69 43.678 162.032 44.08 162.26 44.62C162.488 45.148 162.602 45.82 162.602 46.636V50.992C162.602 51.364 162.506 51.652 162.314 51.856C162.122 52.048 161.846 52.144 161.486 52.144C161.126 52.144 160.844 52.048 160.64 51.856C160.448 51.652 160.352 51.364 160.352 50.992V46.744C160.352 46.06 160.22 45.562 159.956 45.25C159.704 44.938 159.308 44.782 158.768 44.782C158.108 44.782 157.58 44.992 157.184 45.412C156.8 45.82 156.608 46.366 156.608 47.05V50.992C156.608 51.76 156.23 52.144 155.474 52.144ZM168.901 52.18C167.989 52.18 167.197 51.994 166.525 51.622C165.853 51.25 165.331 50.722 164.959 50.038C164.587 49.342 164.401 48.526 164.401 47.59C164.401 46.882 164.503 46.252 164.707 45.7C164.923 45.136 165.229 44.656 165.625 44.26C166.021 43.852 166.495 43.546 167.047 43.342C167.599 43.126 168.217 43.018 168.901 43.018C169.813 43.018 170.605 43.204 171.277 43.576C171.949 43.948 172.471 44.476 172.843 45.16C173.215 45.844 173.401 46.654 173.401 47.59C173.401 48.298 173.293 48.934 173.077 49.498C172.873 50.062 172.573 50.548 172.177 50.956C171.781 51.352 171.307 51.658 170.755 51.874C170.203 52.078 169.585 52.18 168.901 52.18ZM168.901 50.47C169.345 50.47 169.735 50.362 170.071 50.146C170.407 49.93 170.665 49.612 170.845 49.192C171.037 48.76 171.133 48.226 171.133 47.59C171.133 46.63 170.929 45.916 170.521 45.448C170.113 44.968 169.573 44.728 168.901 44.728C168.457 44.728 168.067 44.836 167.731 45.052C167.395 45.256 167.131 45.574 166.939 46.006C166.759 46.426 166.669 46.954 166.669 47.59C166.669 48.538 166.873 49.258 167.281 49.75C167.689 50.23 168.229 50.47 168.901 50.47ZM178.484 52.144C178.184 52.144 177.926 52.072 177.71 51.928C177.494 51.772 177.32 51.532 177.188 51.208L174.578 44.548C174.47 44.26 174.434 44.008 174.47 43.792C174.518 43.564 174.632 43.384 174.812 43.252C174.992 43.12 175.232 43.054 175.532 43.054C175.796 43.054 176.012 43.12 176.18 43.252C176.348 43.372 176.492 43.606 176.612 43.954L178.79 49.948H178.376L180.626 43.81C180.722 43.546 180.848 43.354 181.004 43.234C181.172 43.114 181.388 43.054 181.652 43.054C181.916 43.054 182.132 43.12 182.3 43.252C182.468 43.372 182.594 43.558 182.678 43.81L184.892 49.948H184.514L186.71 43.9C186.83 43.576 186.98 43.354 187.16 43.234C187.352 43.114 187.562 43.054 187.79 43.054C188.078 43.054 188.3 43.126 188.456 43.27C188.612 43.414 188.702 43.6 188.726 43.828C188.75 44.044 188.708 44.284 188.6 44.548L186.008 51.208C185.888 51.52 185.714 51.754 185.486 51.91C185.27 52.066 185.012 52.144 184.712 52.144C184.412 52.144 184.148 52.066 183.92 51.91C183.704 51.754 183.536 51.52 183.416 51.208L181.058 44.962H182.084L179.78 51.19C179.66 51.514 179.492 51.754 179.276 51.91C179.06 52.066 178.796 52.144 178.484 52.144ZM191.544 52.144C191.184 52.144 190.908 52.048 190.716 51.856C190.524 51.652 190.428 51.364 190.428 50.992V44.188C190.428 43.816 190.524 43.534 190.716 43.342C190.908 43.15 191.178 43.054 191.526 43.054C191.874 43.054 192.144 43.15 192.336 43.342C192.528 43.534 192.624 43.816 192.624 44.188V45.412L192.426 44.962C192.69 44.326 193.098 43.846 193.65 43.522C194.214 43.186 194.85 43.018 195.558 43.018C196.266 43.018 196.848 43.15 197.304 43.414C197.76 43.678 198.102 44.08 198.33 44.62C198.558 45.148 198.672 45.82 198.672 46.636V50.992C198.672 51.364 198.576 51.652 198.384 51.856C198.192 52.048 197.916 52.144 197.556 52.144C197.196 52.144 196.914 52.048 196.71 51.856C196.518 51.652 196.422 51.364 196.422 50.992V46.744C196.422 46.06 196.29 45.562 196.026 45.25C195.774 44.938 195.378 44.782 194.838 44.782C194.178 44.782 193.65 44.992 193.254 45.412C192.87 45.82 192.678 46.366 192.678 47.05V50.992C192.678 51.76 192.3 52.144 191.544 52.144ZM202.037 52.09C201.629 52.09 201.299 51.964 201.047 51.712C200.807 51.46 200.687 51.136 200.687 50.74C200.687 50.356 200.807 50.044 201.047 49.804C201.299 49.552 201.629 49.426 202.037 49.426C202.457 49.426 202.781 49.552 203.009 49.804C203.249 50.044 203.369 50.356 203.369 50.74C203.369 51.136 203.249 51.46 203.009 51.712C202.781 51.964 202.457 52.09 202.037 52.09ZM216.429 52.18C215.109 52.18 213.975 51.916 213.027 51.388C212.091 50.848 211.371 50.092 210.867 49.12C210.363 48.136 210.111 46.978 210.111 45.646C210.111 44.65 210.255 43.756 210.543 42.964C210.831 42.16 211.245 41.476 211.785 40.912C212.325 40.336 212.985 39.898 213.765 39.598C214.557 39.286 215.445 39.13 216.429 39.13C217.089 39.13 217.737 39.214 218.373 39.382C219.009 39.55 219.567 39.79 220.047 40.102C220.299 40.258 220.467 40.45 220.551 40.678C220.635 40.894 220.653 41.11 220.605 41.326C220.557 41.53 220.455 41.704 220.299 41.848C220.155 41.992 219.969 42.076 219.741 42.1C219.525 42.112 219.285 42.034 219.021 41.866C218.649 41.626 218.247 41.452 217.815 41.344C217.383 41.236 216.945 41.182 216.501 41.182C215.649 41.182 214.929 41.356 214.341 41.704C213.753 42.052 213.309 42.556 213.009 43.216C212.709 43.876 212.559 44.686 212.559 45.646C212.559 46.594 212.709 47.404 213.009 48.076C213.309 48.748 213.753 49.258 214.341 49.606C214.929 49.954 215.649 50.128 216.501 50.128C216.957 50.128 217.407 50.074 217.851 49.966C218.295 49.846 218.715 49.666 219.111 49.426C219.375 49.27 219.609 49.204 219.813 49.228C220.029 49.24 220.209 49.312 220.353 49.444C220.497 49.576 220.593 49.744 220.641 49.948C220.689 50.14 220.677 50.344 220.605 50.56C220.533 50.764 220.389 50.944 220.173 51.1C219.693 51.448 219.117 51.718 218.445 51.91C217.785 52.09 217.113 52.18 216.429 52.18ZM223.695 52.144C223.323 52.144 223.035 52.048 222.831 51.856C222.639 51.652 222.543 51.364 222.543 50.992V44.188C222.543 43.816 222.639 43.534 222.831 43.342C223.023 43.15 223.293 43.054 223.641 43.054C223.989 43.054 224.259 43.15 224.451 43.342C224.643 43.534 224.739 43.816 224.739 44.188V45.322H224.559C224.727 44.602 225.057 44.056 225.549 43.684C226.041 43.312 226.695 43.09 227.511 43.018C227.763 42.994 227.961 43.06 228.105 43.216C228.261 43.36 228.351 43.588 228.375 43.9C228.399 44.2 228.327 44.446 228.159 44.638C228.003 44.818 227.763 44.926 227.439 44.962L227.043 44.998C226.311 45.07 225.759 45.298 225.387 45.682C225.015 46.054 224.829 46.582 224.829 47.266V50.992C224.829 51.364 224.733 51.652 224.541 51.856C224.349 52.048 224.067 52.144 223.695 52.144ZM233.789 52.18C232.793 52.18 231.935 51.994 231.215 51.622C230.495 51.25 229.937 50.722 229.541 50.038C229.157 49.354 228.965 48.544 228.965 47.608C228.965 46.696 229.151 45.898 229.523 45.214C229.907 44.53 230.429 43.996 231.089 43.612C231.761 43.216 232.523 43.018 233.375 43.018C233.999 43.018 234.557 43.12 235.049 43.324C235.553 43.528 235.979 43.822 236.327 44.206C236.687 44.59 236.957 45.058 237.137 45.61C237.329 46.15 237.425 46.762 237.425 47.446C237.425 47.662 237.347 47.83 237.191 47.95C237.047 48.058 236.837 48.112 236.561 48.112H230.783V46.816H235.841L235.553 47.086C235.553 46.534 235.469 46.072 235.301 45.7C235.145 45.328 234.911 45.046 234.599 44.854C234.299 44.65 233.921 44.548 233.465 44.548C232.961 44.548 232.529 44.668 232.169 44.908C231.821 45.136 231.551 45.466 231.359 45.898C231.179 46.318 231.089 46.822 231.089 47.41V47.536C231.089 48.52 231.317 49.258 231.773 49.75C232.241 50.23 232.925 50.47 233.825 50.47C234.137 50.47 234.485 50.434 234.869 50.362C235.265 50.278 235.637 50.14 235.985 49.948C236.237 49.804 236.459 49.744 236.651 49.768C236.843 49.78 236.993 49.846 237.101 49.966C237.221 50.086 237.293 50.236 237.317 50.416C237.341 50.584 237.305 50.758 237.209 50.938C237.125 51.118 236.975 51.274 236.759 51.406C236.339 51.67 235.853 51.868 235.301 52C234.761 52.12 234.257 52.18 233.789 52.18ZM242.105 52.18C241.469 52.18 240.899 52.06 240.395 51.82C239.903 51.568 239.513 51.232 239.225 50.812C238.949 50.392 238.811 49.918 238.811 49.39C238.811 48.742 238.979 48.232 239.315 47.86C239.651 47.476 240.197 47.2 240.953 47.032C241.709 46.864 242.723 46.78 243.995 46.78H244.895V48.076H244.013C243.269 48.076 242.675 48.112 242.231 48.184C241.787 48.256 241.469 48.382 241.277 48.562C241.097 48.73 241.007 48.97 241.007 49.282C241.007 49.678 241.145 50.002 241.421 50.254C241.697 50.506 242.081 50.632 242.573 50.632C242.969 50.632 243.317 50.542 243.617 50.362C243.929 50.17 244.175 49.912 244.355 49.588C244.535 49.264 244.625 48.892 244.625 48.472V46.402C244.625 45.802 244.493 45.37 244.229 45.106C243.965 44.842 243.521 44.71 242.897 44.71C242.549 44.71 242.171 44.752 241.763 44.836C241.367 44.92 240.947 45.064 240.503 45.268C240.275 45.376 240.071 45.406 239.891 45.358C239.723 45.31 239.591 45.214 239.495 45.07C239.399 44.914 239.351 44.746 239.351 44.566C239.351 44.386 239.399 44.212 239.495 44.044C239.591 43.864 239.753 43.732 239.981 43.648C240.533 43.42 241.061 43.258 241.565 43.162C242.081 43.066 242.549 43.018 242.969 43.018C243.833 43.018 244.541 43.15 245.093 43.414C245.657 43.678 246.077 44.08 246.353 44.62C246.629 45.148 246.767 45.832 246.767 46.672V50.992C246.767 51.364 246.677 51.652 246.497 51.856C246.317 52.048 246.059 52.144 245.723 52.144C245.387 52.144 245.123 52.048 244.931 51.856C244.751 51.652 244.661 51.364 244.661 50.992V50.128H244.805C244.721 50.548 244.553 50.914 244.301 51.226C244.061 51.526 243.755 51.76 243.383 51.928C243.011 52.096 242.585 52.18 242.105 52.18ZM253.083 52.18C252.303 52.18 251.649 52.048 251.121 51.784C250.605 51.52 250.221 51.136 249.969 50.632C249.717 50.116 249.591 49.48 249.591 48.724V44.89H248.655C248.367 44.89 248.145 44.818 247.989 44.674C247.833 44.518 247.755 44.308 247.755 44.044C247.755 43.768 247.833 43.558 247.989 43.414C248.145 43.27 248.367 43.198 248.655 43.198H249.591V41.56C249.591 41.188 249.687 40.906 249.879 40.714C250.083 40.522 250.365 40.426 250.725 40.426C251.085 40.426 251.361 40.522 251.553 40.714C251.745 40.906 251.841 41.188 251.841 41.56V43.198H253.749C254.037 43.198 254.259 43.27 254.415 43.414C254.571 43.558 254.649 43.768 254.649 44.044C254.649 44.308 254.571 44.518 254.415 44.674C254.259 44.818 254.037 44.89 253.749 44.89H251.841V48.598C251.841 49.174 251.967 49.606 252.219 49.894C252.471 50.182 252.879 50.326 253.443 50.326C253.647 50.326 253.827 50.308 253.983 50.272C254.139 50.236 254.277 50.212 254.397 50.2C254.541 50.188 254.661 50.236 254.757 50.344C254.853 50.44 254.901 50.644 254.901 50.956C254.901 51.196 254.859 51.412 254.775 51.604C254.703 51.784 254.565 51.91 254.361 51.982C254.205 52.03 254.001 52.072 253.749 52.108C253.497 52.156 253.275 52.18 253.083 52.18ZM260.209 52.18C259.213 52.18 258.355 51.994 257.635 51.622C256.915 51.25 256.357 50.722 255.961 50.038C255.577 49.354 255.385 48.544 255.385 47.608C255.385 46.696 255.571 45.898 255.943 45.214C256.327 44.53 256.849 43.996 257.509 43.612C258.181 43.216 258.943 43.018 259.795 43.018C260.419 43.018 260.977 43.12 261.469 43.324C261.973 43.528 262.399 43.822 262.747 44.206C263.107 44.59 263.377 45.058 263.557 45.61C263.749 46.15 263.845 46.762 263.845 47.446C263.845 47.662 263.767 47.83 263.611 47.95C263.467 48.058 263.257 48.112 262.981 48.112H257.203V46.816H262.261L261.973 47.086C261.973 46.534 261.889 46.072 261.721 45.7C261.565 45.328 261.331 45.046 261.019 44.854C260.719 44.65 260.341 44.548 259.885 44.548C259.381 44.548 258.949 44.668 258.589 44.908C258.241 45.136 257.971 45.466 257.779 45.898C257.599 46.318 257.509 46.822 257.509 47.41V47.536C257.509 48.52 257.737 49.258 258.193 49.75C258.661 50.23 259.345 50.47 260.245 50.47C260.557 50.47 260.905 50.434 261.289 50.362C261.685 50.278 262.057 50.14 262.405 49.948C262.657 49.804 262.879 49.744 263.071 49.768C263.263 49.78 263.413 49.846 263.521 49.966C263.641 50.086 263.713 50.236 263.737 50.416C263.761 50.584 263.725 50.758 263.629 50.938C263.545 51.118 263.395 51.274 263.179 51.406C262.759 51.67 262.273 51.868 261.721 52C261.181 52.12 260.677 52.18 260.209 52.18ZM272.746 55.384C272.482 55.384 272.266 55.312 272.098 55.168C271.93 55.036 271.828 54.856 271.792 54.628C271.768 54.4 271.81 54.16 271.918 53.908L273.142 51.19V52.126L269.866 44.548C269.758 44.284 269.722 44.038 269.758 43.81C269.794 43.582 269.902 43.402 270.082 43.27C270.274 43.126 270.532 43.054 270.856 43.054C271.132 43.054 271.354 43.12 271.522 43.252C271.69 43.372 271.84 43.606 271.972 43.954L274.402 50.02H273.862L276.346 43.936C276.478 43.6 276.634 43.372 276.814 43.252C276.994 43.12 277.234 43.054 277.534 43.054C277.798 43.054 278.008 43.126 278.164 43.27C278.32 43.402 278.416 43.582 278.452 43.81C278.488 44.026 278.446 44.266 278.326 44.53L273.952 54.52C273.796 54.856 273.628 55.084 273.448 55.204C273.268 55.324 273.034 55.384 272.746 55.384ZM283.827 52.18C282.915 52.18 282.123 51.994 281.451 51.622C280.779 51.25 280.257 50.722 279.885 50.038C279.513 49.342 279.327 48.526 279.327 47.59C279.327 46.882 279.429 46.252 279.633 45.7C279.849 45.136 280.155 44.656 280.551 44.26C280.947 43.852 281.421 43.546 281.973 43.342C282.525 43.126 283.143 43.018 283.827 43.018C284.739 43.018 285.531 43.204 286.203 43.576C286.875 43.948 287.397 44.476 287.769 45.16C288.141 45.844 288.327 46.654 288.327 47.59C288.327 48.298 288.219 48.934 288.003 49.498C287.799 50.062 287.499 50.548 287.103 50.956C286.707 51.352 286.233 51.658 285.681 51.874C285.129 52.078 284.511 52.18 283.827 52.18ZM283.827 50.47C284.271 50.47 284.661 50.362 284.997 50.146C285.333 49.93 285.591 49.612 285.771 49.192C285.963 48.76 286.059 48.226 286.059 47.59C286.059 46.63 285.855 45.916 285.447 45.448C285.039 44.968 284.499 44.728 283.827 44.728C283.383 44.728 282.993 44.836 282.657 45.052C282.321 45.256 282.057 45.574 281.865 46.006C281.685 46.426 281.595 46.954 281.595 47.59C281.595 48.538 281.799 49.258 282.207 49.75C282.615 50.23 283.155 50.47 283.827 50.47ZM293.37 52.18C292.638 52.18 292.032 52.048 291.552 51.784C291.072 51.508 290.712 51.1 290.472 50.56C290.244 50.02 290.13 49.348 290.13 48.544V44.188C290.13 43.804 290.226 43.522 290.418 43.342C290.61 43.15 290.886 43.054 291.246 43.054C291.606 43.054 291.882 43.15 292.074 43.342C292.278 43.522 292.38 43.804 292.38 44.188V48.58C292.38 49.204 292.506 49.666 292.758 49.966C293.01 50.266 293.412 50.416 293.964 50.416C294.564 50.416 295.056 50.212 295.44 49.804C295.824 49.384 296.016 48.832 296.016 48.148V44.188C296.016 43.804 296.112 43.522 296.304 43.342C296.496 43.15 296.772 43.054 297.132 43.054C297.492 43.054 297.768 43.15 297.96 43.342C298.164 43.522 298.266 43.804 298.266 44.188V50.992C298.266 51.76 297.9 52.144 297.168 52.144C296.82 52.144 296.55 52.048 296.358 51.856C296.166 51.652 296.07 51.364 296.07 50.992V49.624L296.322 50.164C296.07 50.812 295.686 51.31 295.17 51.658C294.666 52.006 294.066 52.18 293.37 52.18ZM301.76 52.144C301.388 52.144 301.1 52.048 300.896 51.856C300.704 51.652 300.608 51.364 300.608 50.992V44.188C300.608 43.816 300.704 43.534 300.896 43.342C301.088 43.15 301.358 43.054 301.706 43.054C302.054 43.054 302.324 43.15 302.516 43.342C302.708 43.534 302.804 43.816 302.804 44.188V45.322H302.624C302.792 44.602 303.122 44.056 303.614 43.684C304.106 43.312 304.76 43.09 305.576 43.018C305.828 42.994 306.026 43.06 306.17 43.216C306.326 43.36 306.416 43.588 306.44 43.9C306.464 44.2 306.392 44.446 306.224 44.638C306.068 44.818 305.828 44.926 305.504 44.962L305.108 44.998C304.376 45.07 303.824 45.298 303.452 45.682C303.08 46.054 302.894 46.582 302.894 47.266V50.992C302.894 51.364 302.798 51.652 302.606 51.856C302.414 52.048 302.132 52.144 301.76 52.144ZM316.557 52.18C315.645 52.18 314.853 51.994 314.181 51.622C313.509 51.25 312.987 50.722 312.615 50.038C312.243 49.342 312.057 48.526 312.057 47.59C312.057 46.882 312.159 46.252 312.363 45.7C312.579 45.136 312.885 44.656 313.281 44.26C313.677 43.852 314.151 43.546 314.703 43.342C315.255 43.126 315.873 43.018 316.557 43.018C317.469 43.018 318.261 43.204 318.933 43.576C319.605 43.948 320.127 44.476 320.499 45.16C320.871 45.844 321.057 46.654 321.057 47.59C321.057 48.298 320.949 48.934 320.733 49.498C320.529 50.062 320.229 50.548 319.833 50.956C319.437 51.352 318.963 51.658 318.411 51.874C317.859 52.078 317.241 52.18 316.557 52.18ZM316.557 50.47C317.001 50.47 317.391 50.362 317.727 50.146C318.063 49.93 318.321 49.612 318.501 49.192C318.693 48.76 318.789 48.226 318.789 47.59C318.789 46.63 318.585 45.916 318.177 45.448C317.769 44.968 317.229 44.728 316.557 44.728C316.113 44.728 315.723 44.836 315.387 45.052C315.051 45.256 314.787 45.574 314.595 46.006C314.415 46.426 314.325 46.954 314.325 47.59C314.325 48.538 314.529 49.258 314.937 49.75C315.345 50.23 315.885 50.47 316.557 50.47ZM326.14 52.144C325.84 52.144 325.582 52.072 325.366 51.928C325.15 51.772 324.976 51.532 324.844 51.208L322.234 44.548C322.126 44.26 322.09 44.008 322.126 43.792C322.174 43.564 322.288 43.384 322.468 43.252C322.648 43.12 322.888 43.054 323.188 43.054C323.452 43.054 323.668 43.12 323.836 43.252C324.004 43.372 324.148 43.606 324.268 43.954L326.446 49.948H326.032L328.282 43.81C328.378 43.546 328.504 43.354 328.66 43.234C328.828 43.114 329.044 43.054 329.308 43.054C329.572 43.054 329.788 43.12 329.956 43.252C330.124 43.372 330.25 43.558 330.334 43.81L332.548 49.948H332.17L334.366 43.9C334.486 43.576 334.636 43.354 334.816 43.234C335.008 43.114 335.218 43.054 335.446 43.054C335.734 43.054 335.956 43.126 336.112 43.27C336.268 43.414 336.358 43.6 336.382 43.828C336.406 44.044 336.364 44.284 336.256 44.548L333.664 51.208C333.544 51.52 333.37 51.754 333.142 51.91C332.926 52.066 332.668 52.144 332.368 52.144C332.068 52.144 331.804 52.066 331.576 51.91C331.36 51.754 331.192 51.52 331.072 51.208L328.714 44.962H329.74L327.436 51.19C327.316 51.514 327.148 51.754 326.932 51.91C326.716 52.066 326.452 52.144 326.14 52.144ZM339.2 52.144C338.84 52.144 338.564 52.048 338.372 51.856C338.18 51.652 338.084 51.364 338.084 50.992V44.188C338.084 43.816 338.18 43.534 338.372 43.342C338.564 43.15 338.834 43.054 339.182 43.054C339.53 43.054 339.8 43.15 339.992 43.342C340.184 43.534 340.28 43.816 340.28 44.188V45.412L340.082 44.962C340.346 44.326 340.754 43.846 341.306 43.522C341.87 43.186 342.506 43.018 343.214 43.018C343.922 43.018 344.504 43.15 344.96 43.414C345.416 43.678 345.758 44.08 345.986 44.62C346.214 45.148 346.328 45.82 346.328 46.636V50.992C346.328 51.364 346.232 51.652 346.04 51.856C345.848 52.048 345.572 52.144 345.212 52.144C344.852 52.144 344.57 52.048 344.366 51.856C344.174 51.652 344.078 51.364 344.078 50.992V46.744C344.078 46.06 343.946 45.562 343.682 45.25C343.43 44.938 343.034 44.782 342.494 44.782C341.834 44.782 341.306 44.992 340.91 45.412C340.526 45.82 340.334 46.366 340.334 47.05V50.992C340.334 51.76 339.956 52.144 339.2 52.144ZM349.693 48.346C349.465 48.346 349.285 48.274 349.153 48.13C349.033 47.986 348.961 47.782 348.937 47.518L348.397 40.642C348.361 40.198 348.457 39.844 348.685 39.58C348.913 39.304 349.249 39.166 349.693 39.166C350.125 39.166 350.449 39.304 350.665 39.58C350.893 39.844 350.989 40.198 350.953 40.642L350.413 47.518C350.401 47.782 350.329 47.986 350.197 48.13C350.077 48.274 349.909 48.346 349.693 48.346ZM349.693 52.09C349.285 52.09 348.955 51.964 348.703 51.712C348.463 51.46 348.343 51.136 348.343 50.74C348.343 50.356 348.463 50.044 348.703 49.804C348.955 49.552 349.285 49.426 349.693 49.426C350.113 49.426 350.437 49.552 350.665 49.804C350.905 50.044 351.025 50.356 351.025 50.74C351.025 51.136 350.905 51.46 350.665 51.712C350.437 51.964 350.113 52.09 349.693 52.09Z"
      fill="#181A20"
    />
  </Svg>
);
export default HomeEmptyCollectionBanner;
