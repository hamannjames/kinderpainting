<?php

add_action('acf/init', 'register_blocks');

function register_blocks() {

    if (function_exists('acf_register_block')) {

        acf_register_block(array(
            'name' => 'slider',
            'title' => __('Slider'),
            'description' => __('Slider Widget'),
            'render_callback' => 'acf_render_callback',
            'category' => 'widgets',
            'icon' => 'images-alt2',
            'keywords' => array('slider')
        ));

        acf_register_block(array(
            'name' => 'testimonials',
            'title' => __('Testimonials'),
            'description' => __('Testimonials Widget'),
            'render_callback' => 'acf_render_callback',
            'category' => 'widgets',
            'icon' => 'admin-comments',
            'keywords' => array('testimonials')
        ));

        function acf_render_callback($block, $content = '', $is_preview = false) {
            $context = Timber::get_context();
            $context['block'] = $block;
            $context['fields'] = get_fields();
            $context['is_preview'] = $is_preview;

            Timber::render(get_stylesheet_directory() . '/gutenberg/templates/' . $block['name'] . '.twig', $context);
        }

    }
}

function uwkc_enqueue_gutenberg()
{
    wp_enqueue_script(
        'uwkc_gutenberg_class_styles',
        get_template_directory_uri() . '/gutenberg/extendor-classStyles.js',
        array('wp-blocks')
    );
}
add_Action('enqueue_block_editor_assets', 'uwkc_enqueue_gutenberg');