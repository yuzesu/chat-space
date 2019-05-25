class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new 
    # インスタンス化
    @messages = @group.messages.includes(:user)
    #n+1問題の解消
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
      #notice: flashにてメッセージを格納する
    else
      @messages = @group.messages_path(@group).include(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      reder :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
