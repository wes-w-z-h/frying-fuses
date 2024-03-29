class TopicsController < ApplicationController
  def create
    topic_param = topic_params
    process_params(topic_param)
    topic = Topic.new(topic_param)
    if topic.save
      render json: TopicSerializer.new(topic, options).serializable_hash.to_json
    else
      render json: {error: topic.errors.messages}, status: 422
    end

  end

  def show
    topic = Topic.find_by(slug: params[:id])
    if topic
      render json: TopicSerializer.new(topic, options).serializable_hash.to_json
    end
  end

  def destroy
    topic = Topic.find_by(slug: params[:id])
    if topic
      if topic.destroy
        head :no_content
      else
        render json: {error: topic.errors.messages}, status: 422
      end
    else
      render json: { error: "topic not found" }, status: 404
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:title, :content, :category_id, :user_id)
  end

  # Function to convert the slug when coming in from frontend
  def process_params(params)
    # the request send the slug as id
    category = Category.find_by(name: params[:category_id])
    if category
      category_id = category.id
      params[:category_id] = category_id
    else
      render json: {error: "Invalid category"}, status: 404
    end
  end

  def options
    @options ||= { include: %i[posts] }
  end
end
