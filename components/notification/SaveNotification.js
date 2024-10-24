import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from 'firebase/auth';

const saveNotification = async (notification) => {
  console.log("SaveNotification.js 실행");
  console.log("saveNotification > notification : ", notification);
  const {content} = notification.request;
  console.log("saveNotification > content : ", content);  
 
  let pushType;
  try {
    // pushType 추출
    pushType = content.data.pushType;
    console.log("saveNotification > pushType : ", pushType);

    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.log("로그인된 사용자가 없습니다. 알림을 저장하지 않습니다.");
      return;
    }
    const userEmail = currentUser.email;
    console.log("saveNotification > userEmail : ", userEmail);

    // 키 생성 (이메일_알림유형)
    const storageKey = `${userEmail}_${pushType}`; 

    // 기존 알림 목록 가져오기
    const existingNotifications = await AsyncStorage.getItem(storageKey);
    let notifications = existingNotifications ? JSON.parse(existingNotifications) : [];
    console.log(`기존 ${pushType} 알림 목록:`, notifications);

    // 새 알림 추가
    notifications.push({
      ...notification,
      receivedAt: new Date().toISOString() // 알림 수신 시간 추가
    });
    console.log(`새 ${pushType} 알림 추가 후:`, notifications);

    // 최대 50개의 알림만 유지
    if (notifications.length > 50) {
      notifications = notifications.slice(-50);
    }

    // 업데이트된 알림 목록 저장
    await AsyncStorage.setItem(storageKey, JSON.stringify(notifications));

    console.log(`${pushType} 알림이 로컬에 저장되었습니다`);
  } catch (error) {
    console.error(`알림 로컬 저장 실패 (타입: ${pushType || '알 수 없음'}):`, error);
  }
}

export default saveNotification;
