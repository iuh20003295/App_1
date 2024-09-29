import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused
import Sound from './Sound';

export default function Law() {
  const [isPlaying, setIsPlaying] = useState(true);  // Âm thanh sẽ phát tự động khi vào
  const isFocused = useIsFocused();  // Check xem màn hình có đang được focus hay không

  useEffect(() => {
    if (!isFocused) {
      setIsPlaying(false);  // Tạm dừng nhạc khi rời khỏi màn hình
    } else {
      setIsPlaying(true);   // Phát lại nhạc khi quay lại màn hình
    }
  }, [isFocused]);

  const handleToggleSound = () => {
    setIsPlaying(!isPlaying);  // Đổi trạng thái giữa play và pause
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Truyền trạng thái isPlaying vào component Sound */}
      <Sound isPlaying={isPlaying} />
      <Button 
        title={isPlaying ? "Pause" : "Play"}  // Hiển thị nút dựa trên trạng thái âm thanh
        onPress={handleToggleSound} 
      />
    </View>
  );
}
