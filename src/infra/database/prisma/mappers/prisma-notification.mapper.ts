export class PrismaNotificationMapper {
  static toDomain(raw: any) {
    return {
      id: raw.id,
      content: raw.content,
      category: raw.category,
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt,
    };
  }

  static toPrisma(notification: any) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
